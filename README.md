# Weather India 🌤️

A modern, real-time weather forecasting application for Indian cities built with React, TypeScript, and Tailwind CSS.

![Weather India](https://img.shields.io/badge/React-18.3.1-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-3178c6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 🌡️ **Real-time Weather Data** - Get accurate weather information for any Indian city
- 📍 **Multiple Cities** - View weather for major Indian cities including Delhi, Mumbai, Bangalore, Chennai, Kolkata, and Hyderabad
- 🔍 **City Search** - Search for any Indian city to get detailed weather information
- 📊 **5-Day Forecast** - View detailed weather predictions for the next 5 days
- 🌓 **Dark/Light Theme** - Toggle between dark and light themes with persistent storage
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- ⚡ **Fast & Optimized** - Built with Vite for lightning-fast performance
- 🔒 **Secure** - API keys handled securely on the backend, never exposed to the client
- 🎨 **Beautiful UI** - Modern, clean interface with smooth animations and transitions

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **TypeScript 5.6.3** - Type safety
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Vite 5.4** - Next-generation frontend build tool
- **TanStack React Query** - Data fetching and caching
- **Framer Motion** - Animation library
- **Wouter** - Lightweight routing library
- **Radix UI** - Unstyled, accessible component library
- **Recharts** - React charting library

### Development
- **Node.js** - JavaScript runtime
- **npm** - Package manager

### Deployment
- **Vercel** - Hosting and deployment platform

## 🚀 Getting Started

### Prerequisites

- Node.js 16.0 or higher
- npm 7.0 or higher
- Git
- A WeatherAPI key (free tier available at [weatherapi.com](https://www.weatherapi.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AYUSHOPBOLTE001/weatherlolxd.git
   cd weatherlolxd
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment variables**
   ```bash
   cp .env.example .env
   ```
   Then add your WeatherAPI key to the `.env` file:
   ```dotenv
   VITE_WEATHERAPI_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This generates optimized production files in the `client/dist` directory.

### Preview Production Build

```bash
npm run serve
```

## 📁 Project Structure

```
weatherlolxd/
├── client/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── ui/         # Radix UI components
│   │   │   └── ...         # Custom components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions and configs
│   │   ├── App.tsx         # Main app component
│   │   └── main.tsx        # Entry point
│   ├── index.html          # HTML template
│   └── ...
├── shared/
│   └── schema.ts           # Shared TypeScript types
├── package.json
├── tsconfig.json           # TypeScript config
├── tailwind.config.ts      # Tailwind CSS config
├── vite.config.ts          # Vite config
├── vercel.json            # Vercel deployment config
└── README.md
```

## 🎯 Usage

### Viewing Current Weather
- Navigate to the home page (`/`)
- See weather for major Indian cities at a glance
- Click on any city card to view detailed information

### Searching for a City
- Use the search bar to find any Indian city
- View real-time weather data and forecasts
- See additional metrics like humidity, wind speed, and UV index

### Detailed City View
- Access via `/city/:cityName` route
- View comprehensive weather information
- See 5-day weather forecast with charts
- Check historical weather patterns (if available)

### Theme Toggle
- Click the theme toggle button in the header
- Switch between dark and light themes
- Your preference is saved automatically

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```dotenv
VITE_WEATHERAPI_KEY=your_weatherapi_key
```

### Vite Configuration

The project uses a custom Vite configuration with path aliases:
- `@` - Points to `client/src`
- `@shared` - Points to `shared`

## 📦 API Integration

This project uses **WeatherAPI** for weather data:

- **Endpoint**: https://api.weatherapi.com/v1/
- **Current Weather**: `/current.json`
- **Forecast**: `/forecast.json`

All API requests are made from the frontend with the API key stored as a Vite environment variable.

## 🚀 Deployment

### Deploy to Vercel

This project is configured for easy deployment to Vercel:

1. **Connect your GitHub repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Select your GitHub repository

2. **Configure environment variables**
   - Add `VITE_WEATHERAPI_KEY` in Vercel project settings
   - Set the value to your WeatherAPI key

3. **Deploy**
   - Vercel automatically deploys on every push to the main branch
   - Build command: `npm run build`
   - Output directory: `client/dist`
   - Framework preset: Vite

**Live Demo**: [Weather India on Vercel](https://weatherlolxd.vercel.app)

## 👥 Team

Meet the talented team behind Weather India:

| Name | Role | Links |
|------|------|-------|
| **Ayush** | Leader | [GitHub](https://github.com/AYUSHOPBOLTE001) • [LinkedIn](https://www.linkedin.com/in/ayushopbolte001/) |
| **Arsh** | UI/UX Designer | [Portfolio](https://ogarsh.tech/) |
| **Anush** | Backend Developer | [GitHub](https://github.com/Anushkalraa) • [LinkedIn](https://www.linkedin.com/in/anushkalra) |

## 📊 Key Metrics Tracked

- **Temperature** - Current temperature in Celsius and Fahrenheit
- **Humidity** - Percentage of moisture in the air
- **Wind Speed** - Speed in km/h or mph
- **Pressure** - Atmospheric pressure
- **UV Index** - Ultraviolet radiation intensity
- **Visibility** - Visibility distance in km or miles
- **Precipitation** - Rainfall amount and probability

## 🎨 Design Highlights

- **Modern Color Scheme** - Carefully curated colors for optimal readability
- **Glass-Morphism Effects** - Subtle frosted glass effects for depth
- **Smooth Animations** - Framer Motion for engaging transitions
- **Accessibility** - Built with Radix UI for WCAG compliance
- **Responsive Grid** - Adapts beautifully to all screen sizes

## 🔒 Privacy & Security

- ✅ No personal data collection
- ✅ No tracking or analytics that identify users
- ✅ API keys are never exposed to the client
- ✅ All API requests made through secure connections
- ✅ Environment variables properly managed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For questions, issues, or suggestions:
- Open an [GitHub Issue](https://github.com/AYUSHOPBOLTE001/weatherlolxd/issues)
- Contact us via [LinkedIn](https://www.linkedin.com/in/ayushopbolte001/)

## 🙏 Acknowledgments

- [WeatherAPI](https://www.weatherapi.com/) - Weather data provider
- [Radix UI](https://radix-ui.com/) - Component library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Vite](https://vitejs.dev/) - Build tool
- [React](https://react.dev/) - UI library

## 📈 Roadmap

- [ ] Add more cities beyond India
- [ ] Implement weather alerts
- [ ] Add historical weather data visualization
- [ ] Weather comparison between cities
- [ ] Mobile app (React Native)
- [ ] User accounts for saved preferences
- [ ] Weather sharing feature

---

<div align="center">

**Made with ❤️ by the Weather India Team**

[View on GitHub](https://github.com/AYUSHOPBOLTE001/weatherlolxd) • [Live Demo](https://weatherlolxd.vercel.app)

</div>
