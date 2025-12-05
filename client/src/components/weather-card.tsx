import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Droplets, Wind, Gauge, Eye, ThermometerSun } from "lucide-react";
import type { CurrentWeather } from "../../../shared/schema";
import { 
  getWeatherGradient, 
  getWeatherTextColor, 
  getWeatherIconUrl, 
  formatTemperature,
  formatWindSpeed,
  formatVisibility
} from "@/lib/weather-utils";

interface WeatherCardProps {
  weather: CurrentWeather;
  variant?: "featured" | "full";
}

export function WeatherCard({ weather, variant = "featured" }: WeatherCardProps) {
  if (variant === "featured") {
    return (
      <Link href={`/city/${encodeURIComponent(weather.city)}`}>
        <Card 
          className={`relative overflow-hidden glass-effect p-5 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl rounded-lg`}
          data-testid={`card-city-${weather.city.toLowerCase()}`}
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-lg font-semibold" data-testid={`text-city-name-${weather.city.toLowerCase()}`}>
                {weather.city}
              </h3>
              <p className="text-sm opacity-90">{weather.country}</p>
            </div>
            <img 
              src={getWeatherIconUrl(weather.icon)} 
              alt={weather.description}
              className="w-14 h-14 -mt-1 -mr-1"
              data-testid={`img-weather-icon-${weather.city.toLowerCase()}`}
            />
          </div>
          
          <div className="mb-4">
            <span className="text-5xl font-bold" data-testid={`text-temperature-${weather.city.toLowerCase()}`}>
              {formatTemperature(weather.temperature)}
            </span>
            <p className="text-sm capitalize opacity-90 mt-1">{weather.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/20">
            <div className="flex flex-col items-center gap-1">
              <Droplets className="w-4 h-4 opacity-80" />
              <span className="text-xs font-medium" data-testid={`text-humidity-${weather.city.toLowerCase()}`}>
                {weather.humidity}%
              </span>
              <span className="text-[10px] opacity-70">Humidity</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Wind className="w-4 h-4 opacity-80" />
              <span className="text-xs font-medium" data-testid={`text-wind-${weather.city.toLowerCase()}`}>
                {formatWindSpeed(weather.windSpeed)}
              </span>
              <span className="text-[10px] opacity-70">Wind</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Gauge className="w-4 h-4 opacity-80" />
              <span className="text-xs font-medium" data-testid={`text-pressure-${weather.city.toLowerCase()}`}>
                {weather.pressure} hPa
              </span>
              <span className="text-[10px] opacity-70">Pressure</span>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  // Full variant for city detail page
  return (
    <Card 
      className={`relative overflow-hidden glass-effect p-6 rounded-lg`}
      data-testid="card-current-weather"
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold" data-testid="text-detail-city-name">{weather.city}</h2>
          <p className="text-sm opacity-90">{weather.country}</p>
        </div>
        <img 
          src={getWeatherIconUrl(weather.icon)} 
          alt={weather.description}
          className="w-20 h-20"
          data-testid="img-detail-weather-icon"
        />
      </div>
      
      <div className="mt-4">
        <span className="text-7xl font-bold" data-testid="text-detail-temperature">
          {formatTemperature(weather.temperature)}
        </span>
        <p className="text-lg capitalize mt-2">{weather.description}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-4 border-t border-white/20">
        <div className="flex items-center gap-2">
          <ThermometerSun className="w-5 h-5 opacity-80" />
          <div>
            <p className="text-sm font-medium" data-testid="text-feels-like">
              {formatTemperature(weather.feelsLike)}
            </p>
            <p className="text-xs opacity-70">Feels Like</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Droplets className="w-5 h-5 opacity-80" />
          <div>
            <p className="text-sm font-medium" data-testid="text-detail-humidity">{weather.humidity}%</p>
            <p className="text-xs opacity-70">Humidity</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="w-5 h-5 opacity-80" />
          <div>
            <p className="text-sm font-medium" data-testid="text-detail-wind">
              {formatWindSpeed(weather.windSpeed)}
            </p>
            <p className="text-xs opacity-70">Wind Speed</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 opacity-80" />
          <div>
            <p className="text-sm font-medium" data-testid="text-visibility">
              {formatVisibility(weather.visibility)}
            </p>
            <p className="text-xs opacity-70">Visibility</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Skeleton loader for weather card
export function WeatherCardSkeleton({ variant = "featured" }: { variant?: "featured" | "full" }) {
  if (variant === "featured") {
    return (
      <Card className="relative overflow-hidden glass-effect p-5 animate-pulse rounded-lg">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="h-5 w-20 bg-white/30 rounded mb-2" />
            <div className="h-3 w-12 bg-white/20 rounded" />
          </div>
          <div className="w-14 h-14 bg-white/20 rounded-full" />
        </div>
        <div className="mb-4">
          <div className="h-12 w-24 bg-white/30 rounded mb-2" />
          <div className="h-4 w-28 bg-white/20 rounded" />
        </div>
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="w-4 h-4 bg-white/20 rounded" />
              <div className="h-3 w-8 bg-white/20 rounded" />
              <div className="h-2 w-12 bg-white/10 rounded" />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden glass-effect p-6 animate-pulse rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <div className="h-7 w-32 bg-white/30 rounded mb-2" />
          <div className="h-4 w-16 bg-white/20 rounded" />
        </div>
        <div className="w-20 h-20 bg-white/20 rounded-full" />
      </div>
      <div className="mt-4">
        <div className="h-16 w-40 bg-white/30 rounded mb-2" />
        <div className="h-5 w-36 bg-white/20 rounded" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-4 border-t border-white/10">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-5 h-5 bg-white/20 rounded" />
            <div>
              <div className="h-4 w-12 bg-white/20 rounded mb-1" />
              <div className="h-3 w-16 bg-white/10 rounded" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
