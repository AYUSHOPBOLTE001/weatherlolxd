import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Cloud, Sun, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ui/theme-toggle";

export function Header() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Dashboard", icon: Sun },
    { href: "/about", label: "About", icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              data-testid="link-logo"
            >
              <div className="relative">
                <Cloud className="w-8 h-8 text-primary" />
                <Sun className="w-4 h-4 text-amber-500 absolute -top-1 -right-1" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Weather India
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-2" data-testid="nav-main">
            {navItems.map((item) => {
              const isActive = location === item.href || 
                (item.href === "/" && location === "") ||
                (item.href !== "/" && location.startsWith(item.href));
              
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "gap-2",
                      isActive && "font-semibold"
                    )}
                    data-testid={`link-${item.label.toLowerCase()}`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
            {/* Theme toggle next to nav */}
            <div className="ml-1">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
