import { useQueries, UseQueryResult } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SearchBar } from "@/components/search-bar";
import { WeatherCard, WeatherCardSkeleton } from "@/components/weather-card";
import { featuredCities } from "../../../shared/schema";
import type { CurrentWeather, FeaturedCity } from "../../../shared/schema";
import { getGreeting } from "@/lib/weather-utils";
import { CloudSun, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Combined type for city with its weather query state
interface CityWeatherState {
  city: FeaturedCity;
  isLoading: boolean;
  isError: boolean;
  data: CurrentWeather | undefined;
  refetch: () => void;
}

// Type for query result with typed queryKey
type WeatherQueryResult = UseQueryResult<CurrentWeather, Error> & {
  queryKey: readonly [string, string];
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  // Create queries with city name in queryKey for reliable identification
  const weatherQueries = useQueries({
    queries: featuredCities.map(city => ({
      queryKey: ['/api/weather', city.name] as const,
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
    })),
    // Build Map using queryKey to extract city name - no positional indexing
    combine: (results) => {
      const queryMap = new Map<string, WeatherQueryResult>();
      
      // Extract city name from each query's queryKey (queryKey[1] is the city name)
      results.forEach((result) => {
        // Access the queryKey directly from the observer/result
        const queryResult = result as WeatherQueryResult;
        // The city name is the second element of the queryKey array
        const cityName = (queryResult as any).queryKey?.[1] || 
                         // Fallback: get city name from successful data
                         (queryResult.data as CurrentWeather | undefined)?.city;
        
        if (cityName) {
          queryMap.set(cityName, queryResult);
        }
      });
      
      return {
        queryMap,
        results, // Keep original results for iteration
        isLoading: results.some(r => r.isLoading),
        allErrored: results.length > 0 && results.every(r => r.isError),
        refetchAll: () => results.forEach(r => r.refetch()),
      };
    },
  });

  // Build city weather states by looking up each city in the queryMap
  const cityWeatherStates: CityWeatherState[] = featuredCities.map((city) => {
    const query = weatherQueries.queryMap.get(city.name);
    
    // If no query found (defensive), show loading state
    if (!query) {
      return {
        city,
        isLoading: true,
        isError: false,
        data: undefined,
        refetch: () => {},
      };
    }
    
    return {
      city,
      isLoading: query.isLoading,
      isError: query.isError,
      data: query.data as CurrentWeather | undefined,
      refetch: () => query.refetch(),
    };
  });

  return (
    <motion.div 
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 sm:py-28">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <motion.div 
                className="flex justify-center mb-6"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <CloudSun className="w-20 h-20 text-primary" />
              </motion.div>
              <motion.h1 
                className="text-4xl sm:text-5xl font-bold text-foreground mb-4 [text-shadow:0_2px_10px_rgba(0,0,0,0.3)]" 
                data-testid="text-greeting"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {getGreeting()}
              </motion.h1>
              <motion.p 
                className="text-muted-foreground text-xl [text-shadow:0_1px_5px_rgba(0,0,0,0.2)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Your one-stop destination for real-time weather updates across India.
              </motion.p>
            </div>

            {/* Search Section */}
            <motion.div 
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <SearchBar />
            </motion.div>
          </div>
        </section>

        {/* Featured Cities Section */}
        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-foreground">
                Featured Cities
              </h2>
              {!weatherQueries.isLoading && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={weatherQueries.refetchAll}
                  className="gap-2"
                  data-testid="button-refresh"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="hidden sm:inline">Refresh</span>
                </Button>
              )}
            </div>

            {weatherQueries.allErrored && (
              <Alert variant="destructive" className="mb-6 glass-effect">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Unable to fetch weather data. Please check your internet connection and try again.
                </AlertDescription>
              </Alert>
            )}

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {weatherQueries.isLoading ? (
                // Show skeleton loaders keyed by city name
                featuredCities.map((city) => (
                  <motion.div key={city.name} variants={itemVariants}>
                    <WeatherCardSkeleton variant="featured" />
                  </motion.div>
                ))
              ) : (
                // Show weather cards using Map-based lookup
                cityWeatherStates.map((state) => {
                  if (state.isLoading) {
                    return (
                      <motion.div key={state.city.name} variants={itemVariants}>
                        <WeatherCardSkeleton variant="featured" />
                      </motion.div>
                    );
                  }
                  if (state.isError) {
                    return (
                      <motion.div 
                        key={state.city.name}
                        className="glass-effect rounded-xl p-5 flex flex-col items-center justify-center text-center"
                        variants={itemVariants}
                      >
                        <AlertCircle className="w-8 h-8 text-destructive mb-2" />
                        <p className="text-sm font-medium">{state.city.name}</p>
                        <p className="text-xs text-muted-foreground">Unable to load</p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => state.refetch()}
                          className="mt-2"
                        >
                          Retry
                        </Button>
                      </motion.div>
                    );
                  }
                  if (state.data) {
                    return (
                      <motion.div key={state.city.name} variants={itemVariants}>
                        <WeatherCard 
                          weather={state.data} 
                          variant="featured" 
                        />
                      </motion.div>
                    );
                  }
                  return (
                    <motion.div key={state.city.name} variants={itemVariants}>
                      <WeatherCardSkeleton key={state.city.name} variant="featured" />
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              variants={containerVariants}
            >
              <motion.div className="p-6 glass-effect rounded-lg" variants={itemVariants}>
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <CloudSun className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Real-time Data</h3>
                <p className="text-sm text-muted-foreground">
                  Get accurate, up-to-date weather information for any city in India
                </p>
              </motion.div>
              <motion.div className="p-6 glass-effect rounded-lg" variants={itemVariants}>
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">5-Day Forecast</h3>
                <p className="text-sm text-muted-foreground">
                  Plan ahead with detailed 5-day weather forecasts for every city
                </p>
              </motion.div>
              <motion.div className="p-6 glass-effect rounded-lg" variants={itemVariants}>
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Detailed Metrics</h3>
                <p className="text-sm text-muted-foreground">
                  View humidity, wind speed, pressure, visibility and more
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  );
}
