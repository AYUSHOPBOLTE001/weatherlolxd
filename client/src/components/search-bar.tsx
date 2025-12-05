import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, MapPin } from "lucide-react";
import { indianCities } from "@/lib/weather-utils";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

export function SearchBar({ 
  className,
  placeholder = "Search Indian cities... (e.g., Mumbai, Bangalore)" 
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();

  // Filter suggestions based on query
  useEffect(() => {
    if (query.length >= 2) {
      const filtered = indianCities
        .filter(city => city.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 8);
      setSuggestions(filtered);
      setIsOpen(filtered.length > 0);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (city: string) => {
    if (city.trim()) {
      navigate(`/city/${encodeURIComponent(city.trim())}`);
      setQuery("");
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter") {
        handleSearch(query);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSearch(suggestions[selectedIndex]);
        } else {
          handleSearch(query);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative flex items-center h-14 text-base rounded-xl bg-card border-border shadow-md focus-within:ring-2 focus-within:ring-primary/50">
        <Search className="absolute left-4 w-5 h-5 text-muted-foreground pointer-events-none" />
        <Input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full h-full pl-12 pr-12 bg-transparent border-none rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0"
          data-testid="input-search-city"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="absolute right-2 h-8 w-8"
            data-testid="button-clear-search"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Suggestions dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div 
          className="absolute top-full left-0 right-0 mt-2 bg-card border border-card-border rounded-xl shadow-lg overflow-hidden z-50"
          data-testid="dropdown-suggestions"
        >
          {suggestions.map((city, index) => (
            <button
              key={city}
              onClick={() => handleSearch(city)}
              className={cn(
                "w-full px-4 py-3 text-left flex items-center gap-3 transition-colors",
                index === selectedIndex 
                  ? "bg-accent text-accent-foreground" 
                  : "hover:bg-accent/50"
              )}
              data-testid={`suggestion-${city.toLowerCase()}`}
            >
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span>{city}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
