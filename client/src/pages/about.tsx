import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Cloud, 
  Database, 
  Code2, 
  Globe, 
  Shield,
  Zap,
  Github,
  Linkedin
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function About() {
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
          className="max-w-3xl mx-auto px-4 py-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero */}
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Cloud className="w-16 h-16 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4" data-testid="text-about-title">
              About Weather India
            </h1>
            <p className="text-lg text-muted-foreground">
              Your trusted source for real-time weather information across India
            </p>
          </motion.div>

          {/* What is this app */}
          <motion.section className="mb-12" variants={itemVariants}>
            <h2 className="text-xl font-semibold mb-4">What is Weather India?</h2>
            <Card className="p-6 glass-effect border-white/20 dark:border-white/10">
              <p className="text-muted-foreground leading-relaxed">
                Weather India is a modern weather forecasting application designed to provide 
                accurate and up-to-date weather information for cities across India. Whether 
                you're planning a trip, checking conditions for your daily commute, or simply 
                curious about the weather in different parts of the country, Weather India 
                has you covered.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Our dashboard displays real-time weather data for major Indian cities including 
                New Delhi, Mumbai, Bangalore, Chennai, Kolkata, and Hyderabad. You can also search 
                for any Indian city to get detailed weather information including temperature, 
                humidity, wind speed, and a 5-day forecast.
              </p>
            </Card>
          </motion.section>

          {/* Features */}
          <motion.section className="mb-12" variants={itemVariants}>
            <h2 className="text-xl font-semibold mb-4">Key Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="p-5 glass-effect border-white/20 dark:border-white/10">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Real-time Updates</h3>
                    <p className="text-sm text-muted-foreground">
                      Get current weather conditions updated every few minutes
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-5 glass-effect border-white/20 dark:border-white/10">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">100+ Cities</h3>
                    <p className="text-sm text-muted-foreground">
                      Search weather for any major city across India
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-5 glass-effect border-white/20 dark:border-white/10">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Cloud className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">5-Day Forecast</h3>
                    <p className="text-sm text-muted-foreground">
                      Plan ahead with detailed multi-day weather predictions
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-5 glass-effect border-white/20 dark:border-white/10">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Secure & Fast</h3>
                    <p className="text-sm text-muted-foreground">
                      API keys secured on server, fast response times
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.section>

          {/* Data Source */}
          <motion.section className="mb-12" variants={itemVariants}>
            <h2 className="text-xl font-semibold mb-4">Data Source</h2>
            <Card className="p-6 glass-effect border-white/20 dark:border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
                  <Database className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">WeatherAPI</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Weather India uses WeatherAPI to fetch real-time weather data and forecasts. WeatherAPI
                    provides global weather data including current conditions and multi-day forecasts,
                    delivered through a simple REST API.
                  </p>
                  <a 
                    href="https://www.weatherapi.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary text-sm mt-3 hover:underline"
                  >
                    Learn more about WeatherAPI
                    <Globe className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Technologies */}
          <motion.section className="mb-12" variants={itemVariants}>
            <h2 className="text-xl font-semibold mb-4">Technologies Used</h2>
            <Card className="p-6 glass-effect border-white/20 dark:border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Code2 className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Modern Tech Stack</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/30">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#61dafb' }}>R</span>
                      <div className="text-sm">
                        <div className="font-medium">React</div>
                        <div className="text-xs text-muted-foreground">React with TypeScript</div>
                      </div>
                    </a>

                    <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/30">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#3178c6', color: 'white' }}>TS</span>
                      <div className="text-sm">
                        <div className="font-medium">TypeScript</div>
                        <div className="text-xs text-muted-foreground">Static types for JS</div>
                      </div>
                    </a>

                    <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/30">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#06b6d4', color: 'white' }}>TW</span>
                      <div className="text-sm">
                        <div className="font-medium">Tailwind CSS</div>
                        <div className="text-xs text-muted-foreground">Utility-first styling</div>
                      </div>
                    </a>

                    <a href="https://ui.shadcn.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/30">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#7c3aed', color: 'white' }}>S</span>
                      <div className="text-sm">
                        <div className="font-medium">Shadcn UI</div>
                        <div className="text-xs text-muted-foreground">Design system components</div>
                      </div>
                    </a>

                    <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/30">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#3c873a', color: 'white' }}>N</span>
                      <div className="text-sm">
                        <div className="font-medium">Node.js</div>
                        <div className="text-xs text-muted-foreground">Backend runtime</div>
                      </div>
                    </a>

                    <a href="https://expressjs.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/30">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#000000', color: 'white' }}>Ex</span>
                      <div className="text-sm">
                        <div className="font-medium">Express</div>
                        <div className="text-xs text-muted-foreground">Web framework</div>
                      </div>
                    </a>

                    <a href="https://www.weatherapi.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/30">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#0077b6', color: 'white' }}>W</span>
                      <div className="text-sm">
                        <div className="font-medium">WeatherAPI</div>
                        <div className="text-xs text-muted-foreground">Current & forecast APIs</div>
                      </div>
                    </a>

                    <a href="https://tanstack.com/query/latest" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/30">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#ef4444', color: 'white' }}>TQ</span>
                      <div className="text-sm">
                        <div className="font-medium">TanStack Query</div>
                        <div className="text-xs text-muted-foreground">Data fetching & caching</div>
                      </div>
                    </a>

                    <a href="https://github.com/molefrog/wouter" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/30">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#111827', color: 'white' }}>W</span>
                      <div className="text-sm">
                        <div className="font-medium">Wouter</div>
                        <div className="text-xs text-muted-foreground">Lightweight routing</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Meet the Team */}
          <motion.section className="mb-12" variants={itemVariants}>
            <h2 className="text-xl font-semibold mb-4 text-center">Meet the Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Team Member 1: Ayush */}
              <Card className="p-6 text-center glass-effect border-white/20 dark:border-white/10">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-primary">
                  <AvatarImage src="/silver002.jpg" alt="Ayush" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg">Ayush</h3>
                <p className="text-sm text-primary">Leader</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Leading the team and project vision to success.
                </p>
                <div className="flex justify-center gap-3 mt-4">
                  <a href="https://github.com/AYUSHOPBOLTE001" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/ayushopbolte001/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </Card>

              {/* Team Member 2: Arsh */}
              <Card className="p-6 text-center glass-effect border-white/20 dark:border-white/10">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-primary">
                  <AvatarImage src="/arshpreet.jpg" alt="Arshpreet" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg">Arsh</h3>
                <p className="text-sm text-primary">UI/UX Designer</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Crafting beautiful and intuitive user experiences.
                </p>
                <div className="flex justify-center gap-3 mt-4">
                  <a href="https://ogarsh.tech/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://ogarsh.tech/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </Card>

              {/* Team Member 3: Anush */}
              <Card className="p-6 text-center glass-effect border-white/20 dark:border-white/10">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-primary">
                  <AvatarImage src="/anush.jpg" alt="Anush" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg">Anush</h3>
                <p className="text-sm text-primary">Backend Developer</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Powering the application with robust backend solutions.
                </p>
                <div className="flex justify-center gap-3 mt-4">
                  <a href="https://github.com/Anushkalraa" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/anushkalra?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </Card>
            </div>
          </motion.section>

          {/* Contributors */}
          <motion.section className="mb-12" variants={itemVariants}>
            <h2 className="text-xl font-semibold mb-4 text-center">Contributors</h2>
            <Card className="p-6 glass-effect border-white/20 dark:border-white/10">
              <p className="text-muted-foreground text-center mb-4">
                This project is made possible by the contributions of the open-source community.
              </p>
              <div className="flex justify-center flex-wrap gap-4">
                <a href="https://github.com/AYUSHOPBOLTE001/weatherlolxd/graphs/contributors">
                  <img src="https://contrib.rocks/image?repo=AYUSHOPBOLTE001/weatherlolxd" alt="Contributors" />
                </a>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                Want to contribute? Check out our project on GitHub!
              </p>
              <div className="text-center mt-3">
                <a 
                  href="https://github.com/AYUSHOPBOLTE001/weatherlolxd" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <Github className="w-4 h-4" />
                  View on GitHub
                </a>
              </div>
            </Card>
          </motion.section>

          {/* Privacy Note */}
          <motion.section variants={itemVariants}>
            <Card className="p-6 bg-primary/5 border-primary/20 glass-effect">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Privacy & Security
              </h3>
              <p className="text-sm text-muted-foreground">
                Weather India does not collect or store any personal data. All API requests 
                are made through our secure backend server, ensuring that API keys and 
                sensitive information are never exposed to the client.
              </p>
            </Card>
          </motion.section>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
