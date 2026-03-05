import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import { motion } from 'motion/react';
import { Sprout, Leaf, Languages } from 'lucide-react';
import { Card } from './ui/card';
import { useLanguage } from '../utils/LanguageContext';
import { Language } from '../utils/translations';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setMessage(language === 'kn' ? "ಹೆಸರು, ಇಮೇಲ್ ಮತ್ತು ಪಾಸ್‌ವರ್ಡ್ ಅಗತ್ಯವಿದೆ" : language === 'hi' ? "नाम, ईमेल और पासवर्ड आवश्यक हैं" : "Name, Email and Password are required");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone, location }),
      });
      const data = await res.json();
      if (res.status === 201) {
        setMessage(language === 'kn' ? "✅ ನೋಂದಣಿ ಯಶಸ್ವಿಯಾಗಿದೆ! ನೀವು ಈಗ ಲಾಗಿನ್ ಮಾಡಬಹುದು." : language === 'hi' ? "✅ पंजीकरण सफल! अब आप लॉगिन कर सकते हैं।" : "✅ Registration successful! You can now log in.");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage(`❌ ${data.error || "Registration failed"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage(language === 'kn' ? "❌ ಸರ್ವರ್ ದೋಷ. ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ." : language === 'hi' ? "❌ सर्वर त्रुटि। बाद में पुनः प्रयास करें।" : "❌ Server error. Try again later.");
    } finally {
      setLoading(false);
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
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full max-w-lg relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="border-2 border-green-200 bg-white/80 backdrop-blur-sm p-8 shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sprout className="text-green-600 w-8 h-8" />
                  <h1 className="text-green-800 text-2xl font-extrabold">{t('auth.regHeader')}</h1>
                </div>
                <p className="text-green-700 font-medium">{t('auth.regSubtitle')}</p>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <Input placeholder={t('auth.fullName')} value={name} onChange={(e) => setName(e.target.value)} className="border-green-200" />
                <Input placeholder={t('profile.email')} type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border-green-200" />
                <Input placeholder={t('profile.phone')} value={phone} onChange={(e) => setPhone(e.target.value)} className="border-green-200" />
                <Input placeholder={t('auth.location')} value={location} onChange={(e) => setLocation(e.target.value)} className="border-green-200" />
                <Input placeholder={t('auth.password')} type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border-green-200" />

                <Button type="submit" className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-6 rounded-xl" disabled={loading}>
                  {loading ? "..." : t('auth.regBtn')}
                </Button>

                <div className="text-center mt-4 pt-4 border-t">
                  <p className="text-gray-600 font-medium">{t('auth.hasAccount')}</p>
                  <a href="/login" className="text-green-700 hover:underline font-bold inline-block mt-2">
                    {t('auth.loginLink')}
                  </a>
                </div>
              </form>

              {message && (
                <p className={`mt-4 text-center font-bold font-sm p-2 rounded ${message.includes("✅") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                  {message}
                </p>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
