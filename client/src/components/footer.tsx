import { Cloud, Github, Linkedin } from "lucide-react";
import { Link } from "wouter";

const teamMembers = [
  {
    name: "Ayush",
    designation: "Leader",
    github: "https://github.com/AYUSHOPBOLTE001",
    linkedin: "https://www.linkedin.com/in/ayushopbolte001/"
  },
  {
    name: "Arsh",
    designation: "UI/UX Designer",
    github: "https://ogarsh.tech/",
    linkedin: "https://ogarsh.tech/"
  },
  {
    name: "Anush",
    designation: "Backend Developer",
    github: "https://github.com/Anushkalraa",
    linkedin: "https://www.linkedin.com/in/anushkalra?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
  }
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Cloud className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">Weather India</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted source for real-time weather information across India.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Powered by OpenWeatherMap
            </p>
          </div>

          {/* Links section */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors block">
                Home
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors block">
                About
              </Link>
              <a href="https://github.com/AYUSHOPBOLTE001/weatherlolxd" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors block">
                GitHub
              </a>
            </div>
          </div>

          {/* Team section */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Team</h3>
            <div className="space-y-2">
              {teamMembers.map((member) => (
                <div key={member.name} className="text-sm flex items-center justify-between gap-3">
                  <div>
                    <span className="font-medium text-foreground">{member.name}</span>
                    <span className="text-xs text-muted-foreground"> ({member.designation})</span>
                  </div>
                  <div className="flex gap-2">
                    <a 
                      href={member.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`${member.name}'s GitHub`}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom border and copyright */}
        <div className="border-t border-border pt-6">
          <p className="text-xs text-muted-foreground text-center">
            &copy; 2025 Weather India. Weather data for Indian cities.
          </p>
        </div>
      </div>
    </footer>
  );
}
