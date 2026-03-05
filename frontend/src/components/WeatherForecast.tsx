import { useEffect, useState } from "react";
import { motion } from 'motion/react';
import { Cloud, CloudRain, Sun, Wind, Droplets, AlertTriangle, TreeDeciduous, Waves } from 'lucide-react';
import { Card } from './ui/card';
import { useLanguage } from "../utils/LanguageContext";

const getWeatherIcon = (condition: string) => {
  switch (condition) {
    case 'sunny': return Sun;
    case 'rainy': return CloudRain;
    case 'cloudy': return Cloud;
    case 'partly-cloudy': return Cloud;
    default: return Cloud;
  }
};

export default function WeatherForecast() {
  const { t } = useLanguage();
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [climateAlerts, setClimateAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    try {
      const res = await fetch("http://localhost:5000/weather?city=Bengaluru");
      if (!res.ok) throw new Error("Weather API failed");
      const data = await res.json();
      setWeatherData(data.forecast || []);
      setClimateAlerts(data.alerts || []);
      setLoading(false);
    } catch (e: any) {
      console.error(e);
      setError("Unable to fetch weather");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (!loading && (weatherData.length === 0)) {
    weatherData.push(
      { day: 'Mon', temp: 32, condition: 'sunny', rain: 0, humidity: 45 },
      { day: 'Tue', temp: 30, condition: 'partly-cloudy', rain: 10, humidity: 55 },
      { day: 'Wed', temp: 28, condition: 'rainy', rain: 80, humidity: 85 },
      { day: 'Thu', temp: 27, condition: 'rainy', rain: 70, humidity: 80 },
      { day: 'Fri', temp: 29, condition: 'cloudy', rain: 30, humidity: 65 },
      { day: 'Sat', temp: 31, condition: 'partly-cloudy', rain: 20, humidity: 50 },
      { day: 'Sun', temp: 33, condition: 'sunny', rain: 5, humidity: 40 },
    );
  }

  if (!loading && climateAlerts.length === 0) {
    climateAlerts.push(
      { type: 'flood', severity: 'high', title: 'Heavy Rainfall Alert', description: 'Expected rainfall of 150mm in next 48 hours', icon: Waves, color: 'blue' },
      { type: 'heat', severity: 'medium', title: 'Heatwave Warning', description: 'Temperatures may exceed 40°C next week', icon: Sun, color: 'orange' },
      { type: 'drought', severity: 'low', title: 'Dry Spell Notice', description: 'No significant rain expected for 10 days', icon: TreeDeciduous, color: 'amber' }
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div className="text-center relative" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="inline-flex items-center gap-3 mb-2">
          <Cloud className="text-blue-600 w-10 h-10" />
          <h1 className="text-green-800">{t('weather.header')}</h1>
          <Sun className="text-yellow-600 w-10 h-10" />
        </div>
        <p className="text-green-700">{t('weather.subtitle')}</p>
      </motion.div>

      {/* Loading or Error */}
      {loading && <p className="text-center text-green-700 font-bold">{t('weather.fetching')}</p>}
      {error && <p className="text-center text-red-700 font-bold">{error}</p>}

      {/* 7-day forecast */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {weatherData.map((day: any, index: number) => {
          const WeatherIcon = getWeatherIcon(day.condition);
          return (
            <motion.div key={day.day + index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
              <Card className="relative border-2 border-green-300 bg-gradient-to-br from-blue-50 to-cyan-50 overflow-hidden group hover:shadow-xl transition-shadow shadow-md">
                <div className="p-4 space-y-3 relative text-center">
                  <p className="text-green-800 font-bold">{t(`weather.days.${day.day}`)}</p>
                  <motion.div
                    animate={{ rotate: day.condition === 'sunny' ? [0, 360] : 0, y: day.condition === 'rainy' ? [0, 3, 0] : 0 }}
                    transition={{ duration: day.condition === 'sunny' ? 20 : 2, repeat: Infinity }}
                    className="flex justify-center"
                  >
                    <WeatherIcon className="w-12 h-12 text-blue-600" />
                  </motion.div>
                  <p className="text-blue-900 font-bold text-lg">{day.temp}°C</p>
                  <p className="text-xs text-blue-700 font-medium">{t(`weather.conditions.${day.condition}`)}</p>
                  <div className="space-y-1 mt-2 bg-white/40 rounded-lg p-2">
                    <div className="flex items-center justify-between">
                      <Droplets className="w-4 h-4 text-blue-500" />
                      <span className="text-blue-700 font-bold">{day.rain}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Wind className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700 font-bold">{day.humidity}%</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Climate Alerts */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="text-center">
          <h2 className="text-green-800 mb-2 font-bold text-2xl">{t('weather.alertsHeader')}</h2>
          <p className="text-green-700">{t('weather.alertsSubtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {climateAlerts.map((alert, index) => {
            const Icon = alert.icon || Sun;
            return (
              <motion.div key={alert.title || index} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.2 }}>
                <Card className={`relative border-2 overflow-hidden shadow-lg ${alert.severity === 'high' ? 'border-red-300' : 'border-orange-300'}`}>
                  <div className={`p-6 space-y-4 relative bg-gradient-to-br ${alert.severity === 'high' ? 'from-red-50 to-white' : 'from-orange-50 to-white'}`}>
                    <div className="flex items-start gap-3">
                      <div className={`p-3 rounded-xl ${alert.severity === 'high' ? 'bg-red-100' : 'bg-orange-100'}`}>
                        <Icon className={`w-8 h-8 ${alert.severity === 'high' ? 'text-red-600' : 'text-orange-600'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <AlertTriangle className={`w-5 h-5 ${alert.severity === 'high' ? 'text-red-600' : 'text-orange-600'}`} />
                          <span className={`uppercase font-bold text-xs ${alert.severity === 'high' ? 'text-red-800' : 'text-orange-800'}`}>
                            {t(`scanner.${alert.severity}`)} {t('weather.alert')}
                          </span>
                        </div>
                        <h3 className="text-gray-900 font-bold">{alert.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-700 font-medium">{alert.description}</p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Recommendations */}
      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-md">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <TreeDeciduous className="text-green-600 w-8 h-8" />
            <h3 className="text-green-800 font-bold text-xl">{t('weather.recommendations')}</h3>
          </div>
          <div className="p-4 bg-white/60 rounded-lg border border-green-100 font-medium text-green-800">
            {t('water.tips')[2]} - {t('water.freq.daily')}
          </div>
        </div>
      </Card>
    </div>
  );
}