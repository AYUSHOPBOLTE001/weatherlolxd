import { Card } from "@/components/ui/card";
import { Droplets, Wind, CloudRain } from "lucide-react";
import type { DailyForecast } from "../../../shared/schema";
import { 
  getWeatherGradient, 
  getWeatherTextColor, 
  getWeatherIconUrl, 
  formatTemperature,
  formatWindSpeed,
  formatDate
} from "@/lib/weather-utils";

interface ForecastCardProps {
  forecast: DailyForecast;
  index: number;
}

export function ForecastCard({ forecast, index }: ForecastCardProps) {
  const gradient = getWeatherGradient(forecast.condition);
  const textColor = getWeatherTextColor(forecast.condition);
  const isToday = index === 0;

  return (
    <Card 
      className={`relative overflow-hidden bg-gradient-to-br ${gradient} ${textColor} p-4 border-0 transition-all duration-200 hover:scale-[1.02]`}
      data-testid={`card-forecast-day-${index}`}
    >
      <div className="text-center">
        <p className="text-sm font-semibold opacity-90" data-testid={`text-forecast-date-${index}`}>
          {isToday ? "Today" : formatDate(forecast.date)}
        </p>
        
        <img 
          src={getWeatherIconUrl(forecast.icon)} 
          alt={forecast.description}
          className="w-16 h-16 mx-auto my-1"
          data-testid={`img-forecast-icon-${index}`}
        />
        
        <p className="text-xs capitalize opacity-80 mb-2 line-clamp-1">
          {forecast.description}
        </p>
        
        <div className="flex justify-center items-baseline gap-2 mb-3">
          <span className="text-2xl font-bold" data-testid={`text-forecast-high-${index}`}>
            {formatTemperature(forecast.tempMax)}
          </span>
          <span className="text-sm opacity-70" data-testid={`text-forecast-low-${index}`}>
            {formatTemperature(forecast.tempMin)}
          </span>
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t border-white/20 text-xs">
          <div className="flex items-center gap-1" title="Humidity">
            <Droplets className="w-3 h-3" />
            <span data-testid={`text-forecast-humidity-${index}`}>{forecast.humidity}%</span>
          </div>
          <div className="flex items-center gap-1" title="Wind">
            <Wind className="w-3 h-3" />
            <span data-testid={`text-forecast-wind-${index}`}>{formatWindSpeed(forecast.windSpeed)}</span>
          </div>
          <div className="flex items-center gap-1" title="Rain Probability">
            <CloudRain className="w-3 h-3" />
            <span data-testid={`text-forecast-pop-${index}`}>{Math.round(forecast.pop * 100)}%</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Skeleton loader for forecast card
export function ForecastCardSkeleton() {
  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 p-4 animate-pulse border-0">
      <div className="text-center">
        <div className="h-4 w-16 bg-white/30 rounded mx-auto mb-2" />
        <div className="w-16 h-16 bg-white/20 rounded-full mx-auto my-1" />
        <div className="h-3 w-20 bg-white/20 rounded mx-auto mb-2" />
        <div className="flex justify-center items-baseline gap-2 mb-3">
          <div className="h-7 w-12 bg-white/30 rounded" />
          <div className="h-4 w-10 bg-white/20 rounded" />
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-white/10">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-4 w-8 bg-white/20 rounded" />
          ))}
        </div>
      </div>
    </Card>
  );
}
