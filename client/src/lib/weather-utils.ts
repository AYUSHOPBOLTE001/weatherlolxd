import type { WeatherCondition } from "../../../shared/schema";

// Get weather gradient based on condition
export function getWeatherGradient(condition: string): string {
  const cond = condition.toLowerCase();
  
  if (cond.includes("clear") || cond.includes("sunny")) {
    return "from-amber-400 via-orange-400 to-yellow-500";
  }
  if (cond.includes("cloud")) {
    return "from-slate-400 via-gray-400 to-slate-500";
  }
  if (cond.includes("rain") || cond.includes("drizzle")) {
    return "from-blue-500 via-blue-600 to-indigo-600";
  }
  if (cond.includes("thunder")) {
    return "from-purple-600 via-indigo-700 to-slate-800";
  }
  if (cond.includes("snow")) {
    return "from-blue-100 via-slate-200 to-blue-200";
  }
  if (cond.includes("mist") || cond.includes("fog") || cond.includes("haze")) {
    return "from-gray-300 via-slate-400 to-gray-500";
  }
  
  // Default gradient
  return "from-sky-400 via-blue-500 to-indigo-500";
}

// Get text color for weather card based on condition
export function getWeatherTextColor(condition: string): string {
  const cond = condition.toLowerCase();
  
  if (cond.includes("snow")) {
    return "text-slate-800";
  }
  
  return "text-white";
}

// Get weather icon URL from OpenWeatherMap
export function getWeatherIconUrl(iconCode: string | undefined | null, size: "small" | "large" = "large"): string {
  // Return a small inline SVG placeholder when no icon is provided
  const placeholder = `data:image/svg+xml;utf8,${encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='64' height='64'><path fill='%23cbd5e1' d='M19.35 10.04A7 7 0 0 0 5 9a5 5 0 0 0 0 10h14a4 4 0 0 0 .35-8.96z'/></svg>"
  )}`;

  if (!iconCode) return placeholder;

  const code = String(iconCode).trim();

  // WeatherAPI often returns protocol-relative URLs like //cdn.weatherapi.com/...
  if (code.startsWith("//")) return `https:${code}`;
  if (code.startsWith("http://") || code.startsWith("https://")) return code;

  // Otherwise assume it's an OpenWeatherMap icon code (e.g., '10d')
  const sizeCode = size === "large" ? "@2x" : "";
  return `https://openweathermap.org/img/wn/${code}${sizeCode}.png`;
}

// Format temperature
export function formatTemperature(temp: number, unit: "C" | "F" = "C"): string {
  if (unit === "F") {
    return `${Math.round((temp * 9/5) + 32)}°F`;
  }
  return `${Math.round(temp)}°C`;
}

// Format wind speed
export function formatWindSpeed(speed: number): string {
  return `${Math.round(speed * 3.6)} km/h`;
}

// Format visibility
export function formatVisibility(meters: number): string {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(1)} km`;
  }
  return `${meters} m`;
}

// Format time from Unix timestamp
export function formatTime(timestamp: number, timezone: number = 0): string {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString('en-IN', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC'
  });
}

// Format date from Unix timestamp
export function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-IN', { 
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });
}

// Format full date
export function formatFullDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-IN', { 
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

// Get wind direction as text
export function getWindDirection(degrees: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

// Get current time greeting
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

// Indian cities for search suggestions (includes both Bengaluru and Bangalore for searchability)
export const indianCities = [
  "Mumbai", "Delhi", "Bengaluru", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Surat", "Pune", "Jaipur",
  "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna", "Vadodara",
  "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivli", "Vasai-Virar", "Varanasi",
  "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad", "Ranchi", "Howrah", "Coimbatore", "Jabalpur",
  "Gwalior", "Vijayawada", "Jodhpur", "Madurai", "Raipur", "Kota", "Chandigarh", "Guwahati", "Solapur", "Hubli-Dharwad",
  "Mysore", "Tiruchirappalli", "Bareilly", "Aligarh", "Tiruppur", "Moradabad", "Jalandhar", "Bhubaneswar", "Salem", "Warangal",
  "Guntur", "Bhiwandi", "Saharanpur", "Gorakhpur", "Bikaner", "Amravati", "Noida", "Jamshedpur", "Bhilai", "Cuttack",
  "Firozabad", "Kochi", "Nellore", "Bhavnagar", "Dehradun", "Durgapur", "Asansol", "Rourkela", "Nanded", "Kolhapur",
  "Ajmer", "Akola", "Gulbarga", "Jamnagar", "Ujjain", "Loni", "Siliguri", "Jhansi", "Ulhasnagar", "Jammu",
  "Sangli-Miraj & Kupwad", "Mangalore", "Erode", "Belgaum", "Ambattur", "Tirunelveli", "Malegaon", "Gaya", "Jalgaon", "Udaipur"
];
