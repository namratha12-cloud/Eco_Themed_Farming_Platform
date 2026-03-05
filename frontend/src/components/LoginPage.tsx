import { useState } from 'react';
import { motion } from 'motion/react';
import { Sprout, Leaf, Languages } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card } from './ui/card';
import { useLanguage } from '../utils/LanguageContext';
import { Language } from '../utils/translations';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const { t, language, setLanguage } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.authenticated) {
        localStorage.setItem("farmer_id", data.farmer_id);
        onLogin();
      } else {
        alert(language === 'kn' ? "ತಪ್ಪು ಇಮೇಲ್ ಅಥವಾ ಪಾಸ್‌ವರ್ಡ್" : language === 'hi' ? "गलत ईमेल या पासवर्ड" : "Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      alert(language === 'kn' ? "ಸರ್ವರ್ ದೋಷ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ." : language === 'hi' ? "सर्वर त्रुटि। कृपया पुनः प्रयास करें।" : "Server error. Please try again.");
    }
  };

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'kn', label: 'ಕನ್ನಡ' },
    { code: 'hi', label: 'हिन्दी' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 flex items-center justify-center p-8 overflow-hidden relative">
      <div className="absolute top-6 right-6 z-50">
        <div className="flex bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg border-2 border-green-200">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${language === lang.code ? 'bg-green-600 text-white shadow-md' : 'text-green-700 hover:bg-green-100'
                }`}
            >
              <div className="flex items-center gap-1">
                {language === lang.code && <Languages size={14} />}
                {lang.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute top-20 left-10 w-96 h-96 bg-green-200/30 rounded-full blur-3xl" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity }} />
        <motion.div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl" animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 6, repeat: Infinity }} />
      </div>

      <div className="w-full max-w-6xl flex items-center gap-12 relative z-10">
        <motion.div className="hidden lg:flex flex-1 justify-center items-center relative" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-br from-green-200 via-emerald-200 to-blue-200 rounded-3xl opacity-60" />
            <div className="relative bg-white p-2 rounded-3xl shadow-xl">
              <ImageWithFallback src="https://images.unsplash.com/photo-1618420876506-a803e106a94c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlnaHQlMjBncmVlbiUyMGZhcm0lMjBmaWVsZHxlbnwxfHx8fDE3NjM2NTkxMTN8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="Bright Farm Field" className="w-[500px] h-[600px] object-cover rounded-2xl" />
            </div>
            <motion.div className="absolute -bottom-4 left-8" animate={{ scale: [1, 1.1, 1], rotate: [-5, 5, -5] }} transition={{ duration: 2, repeat: Infinity }}><Sprout className="text-green-500 w-12 h-12 drop-shadow-md" /></motion.div>
          </div>
        </motion.div>

        <motion.div className="flex-1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <Card className="border-2 border-green-200 bg-white/80 backdrop-blur-sm p-12 shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sprout className="text-green-600 w-10 h-10" />
                  <h1 className="text-green-800 text-3xl font-extrabold">{t('auth.loginHeader')}</h1>
                </div>
                <p className="text-green-700 font-medium">{t('auth.loginSubtitle')}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-green-800 mb-2 font-bold">{t('auth.phone')} / Email</label>
                  <Input type="email" placeholder="farmer@krishisarthi.com" value={email} onChange={(e) => setEmail(e.target.value)} className="border-green-200 focus:border-green-500 rounded-xl" required />
                </div>
                <div>
                  <label className="block text-green-800 mb-2 font-bold">{t('auth.password')}</label>
                  <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="border-green-200 focus:border-green-500 rounded-xl" required />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-bold text-lg">
                  <Sprout className="w-5 h-5 mr-2" />
                  {t('auth.loginBtn')}
                </Button>
                <div className="text-center mt-4 pt-4 border-t">
                  <p className="text-gray-600 font-medium">{t('auth.noAccount')}</p>
                  <a href="/register" className="text-green-700 hover:underline font-bold text-lg inline-block mt-2">
                    {t('auth.registerLink')}
                  </a>
                </div>
              </form>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}