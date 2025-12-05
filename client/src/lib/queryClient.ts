import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // Handle query keys with parameters
    // Format: ['/api/endpoint', param1, param2, ...]
    // Converts to: /api/endpoint?city=param1
    let url: string;
    
    let baseUrl = "";
    let param: unknown = undefined;
    if (queryKey.length > 1 && typeof queryKey[0] === 'string') {
      baseUrl = String(queryKey[0]);
      param = queryKey[1];

      // For weather and forecast endpoints, add city parameter
      if (baseUrl.includes('/api/weather') || baseUrl.includes('/api/forecast')) {
        url = `${baseUrl}?city=${encodeURIComponent(String(param))}`;
      } else {
        url = queryKey.join("/");
      }
    } else {
      url = queryKey[0] as string;
      if (typeof url === 'string') baseUrl = url;
    }

    // If the requested endpoint is one of our pseudo-API endpoints, proxy to WeatherAPI (weatherapi.com)
    const apiKey = (import.meta as any).env?.VITE_WEATHERAPI_KEY as string | undefined;
    if ((baseUrl.includes('/api/weather') || baseUrl.includes('/api/forecast'))) {
      if (!apiKey) {
        throw new Error('WeatherAPI key missing. Set VITE_WEATHERAPI_KEY in your .env and restart the dev server.');
      }

      const city = String(param || "");
      if (!city) throw new Error('City parameter missing for weather request');

      // WeatherAPI endpoints
      // Current: https://api.weatherapi.com/v1/current.json?key=KEY&q=City
      // Forecast: https://api.weatherapi.com/v1/forecast.json?key=KEY&q=City&days=5

      const fetchCurrent = async (q: string) => {
        const endpoint = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(q)}`;
        const r = await fetch(endpoint);
        await throwIfResNotOk(r);
        return await r.json();
      };

      const fetchForecast = async (q: string, days = 5) => {
        const endpoint = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(q)}&days=${days}`;
        const r = await fetch(endpoint);
        await throwIfResNotOk(r);
        return await r.json();
      };

      // Map WeatherAPI current response to our CurrentWeather shape
      const mapCurrent = (data: any) => ({
        city: data.location?.name,
        country: data.location?.country,
        temperature: data.current?.temp_c,
        feelsLike: data.current?.feelslike_c,
        humidity: data.current?.humidity,
        windSpeed: data.current?.wind_kph ? (data.current.wind_kph / 3.6) : undefined, // convert kph to m/s approx
        windDirection: data.current?.wind_degree,
        pressure: data.current?.pressure_mb,
        description: data.current?.condition?.text,
        icon: data.current?.condition?.icon,
        visibility: data.current?.vis_km ? Math.round(data.current.vis_km * 1000) : undefined,
        condition: data.current?.condition?.text,
        dt: data.location?.localtime_epoch ?? undefined,
        sunrise: undefined,
        sunset: undefined,
        timezone: undefined,
      });

      if (baseUrl.includes('/api/weather')) {
        try {
          const data = await fetchCurrent(city);
          return mapCurrent(data) as unknown as T;
        } catch (err) {
          console.error('Failed to fetch current weather (WeatherAPI):', err);
          throw err;
        }
      }

      if (baseUrl.includes('/api/forecast')) {
        try {
          const res = await fetchForecast(city, 5);

          // current mapped from forecast response's current field
          const currentMapped = mapCurrent(res);

          const daily = (res.forecast?.forecastday || []).slice(0, 5).map((d: any) => ({
            date: d.date_epoch ?? undefined,
            icon: d.day?.condition?.icon,
            description: d.day?.condition?.text,
            tempMax: d.day?.maxtemp_c,
            tempMin: d.day?.mintemp_c,
            humidity: d.day?.avghumidity,
            windSpeed: d.day?.maxwind_kph ? (d.day.maxwind_kph / 3.6) : undefined,
            pop: (typeof d.day?.daily_chance_of_rain === 'string') ? Number(d.day.daily_chance_of_rain) / 100 : (d.day?.daily_chance_of_rain ?? 0) / 100,
            condition: d.day?.condition?.text,
          }));

          return { current: currentMapped, forecasts: daily } as unknown as T;
        } catch (err) {
          console.error('Failed to fetch forecast (WeatherAPI):', err);
          throw err;
        }
      }
    }

    // Fallback: regular fetch
    const res = await fetch(url, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes for weather data
      retry: 1,
    },
    mutations: {
      retry: false,
    },
  },
});
