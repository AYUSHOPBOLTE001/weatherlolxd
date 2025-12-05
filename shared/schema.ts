// Minimal shared types and sample data used by the client during development

export type CurrentWeather = {
  city: string;
  country?: string;
  temperature: number;
  feelsLike?: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  description?: string;
  icon?: string;
  visibility?: number;
  condition?: string;
  // OpenWeather-specific fields used by the UI
  dt?: number;
  sunrise?: number;
  sunset?: number;
  timezone?: number;
  windDirection?: number;
};

export type FeaturedCity = { name: string };

export const featuredCities: FeaturedCity[] = [
  { name: "Mumbai" },
  { name: "New Delhi" },
  { name: "Bengaluru" },
  { name: "Chennai" },
  { name: "Kolkata" },
  { name: "Hyderabad" },
];

export type DailyForecast = {
  date: number;
  icon?: string;
  description?: string;
  tempMax: number;
  tempMin: number;
  humidity: number;
  windSpeed: number;
  pop: number; // probability of precipitation (0..1)
  condition?: string;
};

export type ForecastResponse = {
  current: CurrentWeather;
  daily: DailyForecast[];
};

export type WeatherCondition = string;
