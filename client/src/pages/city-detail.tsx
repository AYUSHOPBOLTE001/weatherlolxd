import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SearchBar } from "@/components/search-bar";
import { WeatherCard, WeatherCardSkeleton } from "@/components/weather-card";
import { ForecastCard, ForecastCardSkeleton } from "@/components/forecast-card";
import type { CurrentWeather, ForecastResponse } from "../../../shared/schema";
import { formatTime, formatFullDate, getWindDirection } from "@/lib/weather-utils";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  Sunrise, 
  Sunset, 
  Wind, 
  Compass, 
  Gauge,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function CityDetail() {
  const { city } = useParams<{ city: string }>();
  const decodedCity = decodeURIComponent(city || "");

  // Fetch current weather
  const weatherQuery = useQuery<CurrentWeather>({
    queryKey: ['/api/weather', decodedCity],
    enabled: !!decodedCity,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Fetch 5-day forecast
  const forecastQuery = useQuery<ForecastResponse>({
    queryKey: ['/api/forecast', decodedCity],
    enabled: !!decodedCity,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });

  const isLoading = weatherQuery.isLoading || forecastQuery.isLoading;
  const hasError = weatherQuery.isError || forecastQuery.isError;

  const refetchAll = () => {
    weatherQuery.refetch();
    forecastQuery.refetch();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <motion.div 
          className="max-w-7xl mx-auto px-4 py-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Breadcrumb */}
          <motion.div className="mb-6" variants={itemVariants}>
            <Link href="/">
              <Button variant="ghost" className="gap-2 -ml-2" data-testid="button-back">
                <ChevronLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
            </Link>
          </motion.div>

          {/* Page Header */}
          <motion.div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8" variants={itemVariants}>
            <div>
              <h1 className="text-3xl font-bold text-foreground" data-testid="text-page-title">
                {decodedCity} Weather
              </h1>
              {weatherQuery.data && (
                <p className="text-muted-foreground mt-1">
                  {formatFullDate(weatherQuery.data.dt)}
                </p>
              )}
            </div>
            {!isLoading && (
              <Button 
                variant="outline" 
                onClick={refetchAll}
                className="gap-2"
                data-testid="button-refresh-detail"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
            )}
          </motion.div>

          {/* Error State */}
          {hasError && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Unable to fetch weather data for {decodedCity}. Please check if the city name is correct and try again.
              </AlertDescription>
            </Alert>
          )}

          {/* Current Weather */}
          <motion.section className="mb-8" variants={itemVariants}>
            <h2 className="text-xl font-semibold mb-4">Current Conditions</h2>
            {weatherQuery.isLoading ? (
              <WeatherCardSkeleton variant="full" />
            ) : weatherQuery.data ? (
              <WeatherCard weather={weatherQuery.data} variant="full" />
            ) : null}
          </motion.section>

          {/* Additional Details */}
          {weatherQuery.data && (
            <motion.section className="mb-8" variants={itemVariants}>
              <h2 className="text-xl font-semibold mb-4">Weather Details</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Card className="p-4 glass-effect border-white/20 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                      <Sunrise className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Sunrise</p>
                      <p className="font-semibold" data-testid="text-sunrise">
                        {formatTime(weatherQuery.data.sunrise, weatherQuery.data.timezone)}
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 glass-effect border-white/20 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                      <Sunset className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Sunset</p>
                      <p className="font-semibold" data-testid="text-sunset">
                        {formatTime(weatherQuery.data.sunset, weatherQuery.data.timezone)}
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 glass-effect border-white/20 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Compass className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Wind Direction</p>
                      <p className="font-semibold" data-testid="text-wind-direction">
                        {getWindDirection(weatherQuery.data.windDirection)} ({weatherQuery.data.windDirection}°)
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 glass-effect border-white/20 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                      <Gauge className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pressure</p>
                      <p className="font-semibold" data-testid="text-pressure-detail">
                        {weatherQuery.data.pressure} hPa
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.section>
          )}

          {/* 5-Day Forecast */}
          <motion.section className="mb-8" variants={itemVariants}>
            <h2 className="text-xl font-semibold mb-4">5-Day Forecast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {forecastQuery.isLoading ? (
                [...Array(5)].map((_, i) => (
                  <ForecastCardSkeleton key={i} />
                ))
              ) : forecastQuery.data?.forecasts ? (
                forecastQuery.data.forecasts.map((forecast, index) => (
                  <ForecastCard 
                    key={forecast.date} 
                    forecast={forecast} 
                    index={index} 
                  />
                ))
              ) : null}
            </div>
          </motion.section>

          {/* Search Another City */}
          <motion.section className="py-8 border-t border-border" variants={itemVariants}>
            <h2 className="text-lg font-medium text-center mb-4">
              Search for another city
            </h2>
            <div className="max-w-xl mx-auto">
              <SearchBar />
            </div>
          </motion.section>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
