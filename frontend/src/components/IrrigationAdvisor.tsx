import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Droplets, TreeDeciduous, Waves, Sprout, Cloud, Loader2 } from 'lucide-react';
import { Card } from './ui/card';
import { Slider } from './ui/slider';
import { Button } from './ui/button';
import { useLanguage } from '../utils/LanguageContext';

export default function IrrigationAdvisor() {
  const { t } = useLanguage();
  const [soilMoisture, setSoilMoisture] = useState([45]);
  const [temperature, setTemperature] = useState([28]);
  const [cropStage, setCropStage] = useState('vegetative');
  const [selectedCrop, setSelectedCrop] = useState('wheat');
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = async () => {
    setIsLoading(true);
    setShowResults(false);
    try {
      const response = await fetch('http://localhost:5000/irrigation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crop: selectedCrop,
          stage: cropStage,
          temperature: temperature[0],
          soilMoisture: soilMoisture[0]
        }),
      });
      const data = await response.json();
      setResults(data);
      setShowResults(true);
    } catch (error) {
      console.error('Failed to fetch irrigation data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const stages = [
    { value: 'germination', label: t('water.stages.germination') },
    { value: 'vegetative', label: t('water.stages.vegetative') },
    { value: 'flowering', label: t('water.stages.flowering') },
    { value: 'fruiting', label: t('water.stages.fruiting') }
  ];

  const crops = Object.entries(t('water.crops')).map(([key, value]) => ({
    value: key,
    label: value as string
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        className="text-center relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="inline-flex items-center gap-3 mb-2">
          <Droplets className="text-blue-600 w-10 h-10" />
          <h1 className="text-green-800">{t('water.header')}</h1>
          <Waves className="text-cyan-600 w-10 h-10" />
        </div>
        <p className="text-green-700">{t('water.subtitle')}</p>
      </motion.div>

      {/* Input Parameters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Droplets className="text-blue-600 w-6 h-6" />
              <h3 className="text-blue-900 font-bold">{t('water.moistureHeader')}</h3>
            </div>
            <div className="space-y-4">
              <Slider
                value={soilMoisture}
                onValueChange={setSoilMoisture}
                min={0}
                max={100}
                step={1}
                className="mt-4"
              />
              <div className="flex justify-between items-center font-bold">
                <span className="text-blue-700">{t('water.params.dry')}</span>
                <div className="flex items-center gap-2">
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <Droplets className="text-blue-600 w-5 h-5" />
                  </motion.div>
                  <span className="text-blue-900">{soilMoisture[0]}%</span>
                </div>
                <span className="text-blue-700">{t('water.params.wet')}</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Cloud className="text-orange-600 w-6 h-6" />
              <h3 className="text-orange-900 font-bold">{t('water.tempHeader')}</h3>
            </div>
            <div className="space-y-4">
              <Slider
                value={temperature}
                onValueChange={setTemperature}
                min={10}
                max={45}
                step={1}
                className="mt-4"
              />
              <div className="flex justify-between font-bold">
                <span className="text-orange-700">{t('water.params.cool')}</span>
                <span className="text-orange-900">{temperature[0]}°C</span>
                <span className="text-orange-700">{t('water.params.hot')}</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Crop Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Crop Selection Dropdown */}
        <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <TreeDeciduous className="text-emerald-600 w-6 h-6" />
              <h3 className="text-emerald-900 font-bold">{t('water.cropHeader')}</h3>
            </div>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full p-3 rounded-xl border-2 border-emerald-200 bg-white font-bold text-emerald-900 focus:outline-none focus:border-emerald-500 transition-all"
            >
              {crops.map((crop) => (
                <option key={crop.value} value={crop.value}>
                  {crop.label}
                </option>
              ))}
            </select>
          </div>
        </Card>

        {/* Crop Stage Selection */}
        <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Sprout className="text-green-600 w-6 h-6" />
              <h3 className="text-green-800 font-bold">{t('water.stageHeader')}</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {stages.map((stage) => (
                <button
                  key={stage.value}
                  onClick={() => setCropStage(stage.value)}
                  className={`p-3 rounded-xl border-2 transition-all text-sm ${cropStage === stage.value
                    ? 'border-green-500 bg-green-100 shadow-md'
                    : 'border-green-200 bg-white hover:bg-green-50'
                    }`}
                >
                  <p className={`font-bold ${cropStage === stage.value ? 'text-green-900' : 'text-green-700'}`}>
                    {stage.label}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="flex justify-center">
        <Button
          onClick={handleCalculate}
          disabled={isLoading}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-12 py-8 text-lg font-bold shadow-lg disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="w-6 h-6 mr-2 animate-spin" />
          ) : (
            <Droplets className="w-6 h-6 mr-2" />
          )}
          {t('water.calcBtn')}
        </Button>
      </div>

      {showResults && results && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50 p-8 shadow-xl">
            <div className="text-center space-y-6">
              <h3 className="text-green-800 font-bold text-2xl">{t('water.requirement')}</h3>
              <div className="relative inline-block">
                <div className="relative w-48 h-48 mx-auto">
                  <TreeDeciduous className="absolute inset-0 w-full h-full text-green-700" strokeWidth={1.5} />
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${results.waterLevel}%` }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      className="absolute bottom-0 left-0 right-0 bg-blue-500/40 rounded-b-xl"
                      style={{ clipPath: 'polygon(25% 0, 75% 0, 85% 15%, 90% 30%, 92% 50%, 90% 70%, 85% 85%, 75% 95%, 50% 100%, 25% 95%, 15% 85%, 10% 70%, 8% 50%, 10% 30%, 15% 15%)' }}
                    />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-blue-900 font-bold text-xl">{results.waterLevel.toFixed(0)}% {t('water.requirement')}</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full border border-blue-200 shadow-sm">
                    <Droplets className="text-blue-600 w-5 h-5" />
                    <span className="text-blue-800 font-bold">
                      {t(`water.status.${results.status}`)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Waves className="text-green-600 w-8 h-8" />
                <h3 className="text-green-800 font-bold text-xl">{t('water.schedule')}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/70 rounded-xl p-6 space-y-3 border-2 border-blue-100 shadow-sm">
                  <Droplets className="text-blue-600 w-8 h-8" />
                  <p className="text-blue-800 font-bold">{t('water.amount')}</p>
                  <p className="text-blue-900 font-bold text-lg">{results.amount} mm</p>
                </div>
                <div className="bg-white/70 rounded-xl p-6 space-y-3 border-2 border-emerald-100 shadow-sm">
                  <Cloud className="text-emerald-600 w-8 h-8" />
                  <p className="text-emerald-800 font-bold">{t('water.frequency')}</p>
                  <p className="text-emerald-900 font-bold text-lg">
                    {t(`water.freq.${results.frequency}`)}
                  </p>
                </div>
                <div className="bg-white/70 rounded-xl p-6 space-y-3 border-2 border-green-100 shadow-sm">
                  <Sprout className="text-green-600 w-8 h-8" />
                  <p className="text-green-800 font-bold">{t('water.time')}</p>
                  <p className="text-green-900 font-bold text-lg">{t('water.bestTime')}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50 p-6 shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Droplets className="text-cyan-600 w-8 h-8" />
                <h3 className="text-cyan-800 font-bold text-xl">{t('water.tipsHeader')}</h3>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.tips.map((tip: string, index: number) => (
                  <li key={index} className="flex items-start gap-3 bg-white/50 p-3 rounded-lg border border-cyan-100 shadow-sm">
                    <Droplets className="text-cyan-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-cyan-700 font-medium">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
