//src/app/utils/userData.tsx
'use client';
import { useState, useEffect } from 'react';
import { Sun, CloudSun, Cloud, CloudRain, CloudLightning } from 'lucide-react';

interface WeatherData {
  condition: string;
  temp: number;
  location: string;
  timezone: number;
}

interface TimeData {
  time: string;
  date: string;
}

const CITIES = {
  DUBAI: {
    name: 'Dubai, AE',
    lat: 25.2048,
    lon: 55.2708
  },
  NAIROBI: {
    name: 'Nairobi, KE',
    lat: -1.2864,
    lon: 36.8172
  }
};

export function useUserData() {
  const [currentCity, setCurrentCity] = useState<'DUBAI' | 'NAIROBI'>('DUBAI');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [timeData, setTimeData] = useState<TimeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleCity = () => {
    setCurrentCity(prev => prev === 'DUBAI' ? 'NAIROBI' : 'DUBAI');
  };

  const fetchWeatherData = async (city: keyof typeof CITIES) => {
  try {
    setLoading(true);
    const { lat, lon, name } = CITIES[city];
    
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
    );

    const weatherData = await weatherResponse.json();

    if (
      !weatherData.weather ||
      !Array.isArray(weatherData.weather) ||
      !weatherData.weather[0] ||
      !weatherData.main
    ) {
      throw new Error('Malformed weather data response');
    }

    const timezoneOffset = weatherData.timezone;
    const now = new Date();
    const localTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (timezoneOffset * 1000));

    setWeather({
      condition: weatherData.weather[0].main.toLowerCase(),
      temp: Math.round(weatherData.main.temp),
      location: name,
      timezone: timezoneOffset
    });

    setTimeData({
      time: localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: localTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
    });

    setLoading(false);
  } catch (err) {
    console.error('Error fetching weather data:', err);
    setError('Failed to load weather data');
    setLoading(false);
  }
};


  useEffect(() => {
    fetchWeatherData(currentCity);
  }, [currentCity]);

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'clear':
        return <Sun size={14} />;
      case 'partly-cloudy':
      case 'clouds':
        return <CloudSun size={14} />;
      case 'overcast':
        return <Cloud size={14} />;
      case 'rain':
      case 'drizzle':
        return <CloudRain size={14} />;
      case 'thunderstorm':
        return <CloudLightning size={14} />;
      default:
        return <Sun size={14} />;
    }
  };

  return { 
    weather, 
    timeData, 
    loading, 
    error, 
    getWeatherIcon,
    toggleCity,
    currentCity: CITIES[currentCity].name
  };
}