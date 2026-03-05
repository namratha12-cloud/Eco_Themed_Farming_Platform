import { motion } from 'motion/react';
import {
  BookOpen,
  Sprout,
  Droplets,
  CheckCircle,
  MessageSquare
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useState, useMemo } from 'react';
import { useLanguage } from '../utils/LanguageContext';

const CROP_METRICS: any = {
  'Wheat': { health: 87, soil: 62, water: 55 },
  'Rice': { health: 94, soil: 45, water: 95 },
  'Coconut': { health: 82, soil: 38, water: 20 },
  'Maize': { health: 91, soil: 85, water: 78 },
  'Onion': { health: 68, soil: 50, water: 60 }
};

const DEFAULT_METRICS = { health: 85, soil: 70, water: 80 };

export default function DailyAdvisory() {
  const { t, language } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [aiPrompt, setAiPrompt] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; message: string }>>([]);
  const [isTyping, setIsTyping] = useState(false);

  const crops = ["Wheat", "Rice", "Maize", "Cotton", "Soybean", "Coconut", "Onion", "Tomato", "Potato"];

  const currentMetrics = useMemo(() => {
    return CROP_METRICS[selectedCrop] || DEFAULT_METRICS;
  }, [selectedCrop]);

  const profile = useMemo(() => {
    return t(`advisoryProfiles.${selectedCrop}`) || t(`advisoryProfiles.Wheat`);
  }, [selectedCrop, t]);

  const handleAskAI = async () => {
    if (!aiPrompt.trim()) return;
    const userMsg = aiPrompt;
    setChatMessages(prev => [...prev, { role: 'user', message: userMsg }]);
    setIsTyping(true);
    setAiPrompt('');

    try {
      const res = await fetch('http://localhost:5000/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `${selectedCrop}: ${userMsg}`,
          lang: language
        })
      });
      const data = await res.json();
      setChatMessages(prev => [...prev, { role: 'ai', message: data.message }]);
    } catch (e) {
      setChatMessages(prev => [...prev, { role: 'ai', message: t('chatbot.error') }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header & Selector */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <motion.div className="text-left relative" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="inline-flex items-center gap-3 mb-2">
            <BookOpen className="text-emerald-600 w-10 h-10" />
            <h1 className="text-green-800">{t('advisory.header')}</h1>
            <Sprout className="text-teal-600 w-10 h-10" />
          </div>
          <p className="text-green-700">{t('advisory.subtitle')} {t('advisory.askPlaceholder')} {t(`crops.${selectedCrop}`)}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-4 rounded-2xl shadow-lg border-2 border-green-200 flex items-center gap-4">
          <label className="text-green-800 font-bold whitespace-nowrap">{t('advisory.selectCrop')}</label>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="bg-green-50 border-2 border-green-300 rounded-xl px-4 py-2 text-green-900 font-semibold focus:outline-none focus:border-green-500"
          >
            {crops.map(c => <option key={c} value={c}>{t(`crops.${c}`)}</option>)}
          </select>
        </motion.div>
      </div>

      {/* Today's Summary */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="border-4 border-emerald-300 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 p-8 relative overflow-hidden">
          <div className="relative space-y-6">
            <div className="flex items-center gap-3">
              <BookOpen className="text-emerald-600 w-8 h-8" />
              <div>
                <h2 className="text-emerald-900">{t(`crops.${selectedCrop}`)} {t('advisory.summary')}</h2>
                <p className="text-emerald-700 font-bold uppercase text-xs tracking-widest">{t('advisory.asOfToday')}</p>
              </div>
            </div>

            <div className="bg-white/60 rounded-2xl p-6 border-2 border-emerald-300 shadow-inner">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="text-green-600 w-6 h-6 flex-shrink-0" />
                  </div>
                  <p className="text-green-900 font-medium text-lg leading-relaxed">{profile.summary}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Detailed Stat Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Health */}
        <Card className="border-2 border-green-300 bg-gradient-to-br from-green-50 to-white p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-2 mb-4 text-green-800 font-extrabold uppercase text-xs tracking-wider"><Sprout className="w-5 h-5" /> {t('advisory.health')}</div>
          <div className="flex justify-between items-end mb-2">
            <span className="text-green-900 font-bold">{t(`advisory.${profile.health.status}`)}</span>
            <span className="text-green-800 text-2xl font-black">{currentMetrics.health}%</span>
          </div>
          <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden mb-4 border shadow-inner">
            <motion.div initial={{ width: 0 }} animate={{ width: `${currentMetrics.health}%` }} transition={{ duration: 1 }} className="bg-gradient-to-r from-green-500 to-emerald-500 h-full" />
          </div>
          <div className="bg-green-100/50 p-3 rounded-lg border border-green-200">
            <p className="text-xs text-green-800 font-bold italic line-clamp-2">"{profile.health.tip}"</p>
          </div>
        </Card>

        {/* Soil */}
        <Card className="border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-white p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-2 mb-4 text-amber-800 font-extrabold uppercase text-xs tracking-wider"><Sprout className="w-5 h-5" /> {t('advisory.soil')}</div>
          <div className="flex justify-between items-end mb-2">
            <span className="text-amber-900 font-bold">{profile.soil.status}</span>
            <span className="text-amber-800 text-2xl font-black">{currentMetrics.soil}%</span>
          </div>
          <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden mb-4 border shadow-inner">
            <motion.div initial={{ width: 0 }} animate={{ width: `${currentMetrics.soil}%` }} transition={{ duration: 1, delay: 0.2 }} className="bg-gradient-to-r from-amber-500 to-orange-500 h-full" />
          </div>
          <div className="bg-amber-100/50 p-3 rounded-lg border border-amber-200">
            <p className="text-xs text-amber-800 font-bold italic line-clamp-2">"{profile.soil.tip}"</p>
          </div>
        </Card>

        {/* Water */}
        <Card className="border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-white p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-2 mb-4 text-blue-800 font-extrabold uppercase text-xs tracking-wider"><Droplets className="w-5 h-5" /> {t('advisory.water')}</div>
          <div className="flex justify-between items-end mb-2">
            <span className="text-blue-900 font-bold">{profile.water.status}</span>
            <span className="text-blue-800 text-2xl font-black">{currentMetrics.water}%</span>
          </div>
          <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden mb-4 border shadow-inner">
            <motion.div initial={{ width: 0 }} animate={{ width: `${currentMetrics.water}%` }} transition={{ duration: 1, delay: 0.4 }} className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full" />
          </div>
          <div className="bg-blue-100/50 p-3 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-800 font-bold italic line-clamp-2">"{profile.water.tip}"</p>
          </div>
        </Card>
      </div>

      {/* AI Chat */}
      <Card className="border-4 border-emerald-400 bg-white p-8 shadow-2xl rounded-3xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Sprout size={120} className="text-emerald-500" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-emerald-100 p-3 rounded-2xl">
              <MessageSquare className="text-emerald-600 w-8 h-8" />
            </div>
            <div>
              <h3 className="text-emerald-900 font-bold text-xl">{t('advisory.askAI')} {t(`crops.${selectedCrop}`)}</h3>
              <p className="text-emerald-600 text-xs font-bold uppercase tracking-widest">{t('chatbot.subtitle')}</p>
            </div>
          </div>

          <div className="space-y-4 mb-8 h-64 overflow-y-auto p-4 bg-gray-50 rounded-2xl border shadow-inner">
            {chatMessages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                <Sprout className="w-12 h-12 mb-2 opacity-20" />
                <p className="text-sm font-medium">{t('chatbot.placeholder')}</p>
              </div>
            )}
            {chatMessages.map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-4 rounded-2xl max-w-md shadow-sm text-sm font-medium ${msg.role === 'user' ? 'bg-emerald-600 text-white rounded-br-none' : 'bg-white border-2 border-emerald-200 text-emerald-900 rounded-bl-none'}`}>
                  {msg.message}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex gap-2 p-2 bg-emerald-50 w-max rounded-lg border border-emerald-100">
                <span className="text-emerald-700 text-xs font-bold animate-pulse">{t('advisory.analyzing')}</span>
              </div>
            )}
          </div>

          <div className="flex gap-4 items-end bg-white p-2 rounded-2xl border-2 border-emerald-200">
            <Textarea
              value={aiPrompt}
              onChange={e => setAiPrompt(e.target.value)}
              placeholder={`${t('advisory.askPlaceholder')} ${t(`crops.${selectedCrop}`)}...`}
              className="border-none focus-visible:ring-0 resize-none text-emerald-900 font-medium placeholder:text-emerald-200"
              rows={2}
            />
            <Button onClick={handleAskAI} className="bg-emerald-600 hover:bg-emerald-700 text-white h-12 px-8 rounded-xl font-bold transition-all shadow-lg active:scale-95">
              {t('advisory.askBtn')}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
