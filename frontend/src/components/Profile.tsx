import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, MapPin, Phone, Mail, Sprout, TreeDeciduous, Leaf, CheckCircle2 } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../utils/LanguageContext';

export default function Profile() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const fid = localStorage.getItem("farmer_id");
      if (!fid) return;
      try {
        const res = await fetch(`http://localhost:5000/profile?farmer_id=${fid}`);
        if (res.ok) {
          const data = await res.json();
          setProfile({
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            location: data.location || ''
          });
        }
      } catch (e) {
        console.error("Failed to load profile", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    const fid = localStorage.getItem("farmer_id");
    if (!fid) return;
    setSaving(true);
    setSuccess(false);
    try {
      const res = await fetch(`http://localhost:5000/update-profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          farmer_id: fid,
          ...profile
        })
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (e) {
      console.error("Update failed", e);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-20 text-center text-green-700 font-bold">Loading your profile...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div className="relative rounded-3xl overflow-hidden shadow-xl" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="relative h-64">
          <div className="absolute inset-0 bg-gradient-to-br from-green-100/60 via-blue-100/60 to-emerald-100/60" />
          <ImageWithFallback src="https://images.unsplash.com/photo-1693587281791-2146786dc066?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVhdCUyMGZpZWxkJTIwYmx1ZSUyMHNreXxlbnwxfHx8fDE3NjM2NTkxMTR8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="Wheat Field" className="w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
            <div className="inline-flex items-center gap-3 mb-2 bg-white/70 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-lg">
              <User className="text-green-600 w-10 h-10" />
              <h1 className="text-green-800 font-extrabold">{t('profile.header')}</h1>
              <Sprout className="text-emerald-500 w-10 h-10" />
            </div>
            <p className="text-green-800 bg-white/60 backdrop-blur-sm px-6 py-2 rounded-full mt-3 font-medium">{t('profile.subtitle')}</p>
          </div>
        </div>
      </motion.div>

      {/* Profile Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="border-4 border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 p-8 relative overflow-hidden shadow-2xl">
          <div className="relative space-y-8">
            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center ring-4 ring-green-200 shadow-xl">
                <User className="text-white w-16 h-16" />
              </div>
              <div className="text-center">
                <h2 className="text-green-900 text-3xl font-bold">{profile.name}</h2>
                <p className="text-green-700 font-medium">Account ID: KS-{profile.email.split('@')[0]}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-green-800 font-bold text-sm uppercase"><User size={18} /> {t('profile.name')}</label>
                <Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="bg-white/80 border-green-300 focus:border-green-600 text-lg py-6 rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-green-800 font-bold text-sm uppercase"><Mail size={18} /> {t('profile.email')}</label>
                <Input type="email" value={profile.email} disabled className="bg-gray-100/50 border-gray-300 text-lg py-6 cursor-not-allowed rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-green-800 font-bold text-sm uppercase"><Phone size={18} /> {t('profile.phone')}</label>
                <Input type="tel" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="bg-white/80 border-green-300 focus:border-green-600 text-lg py-6 rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-green-800 font-bold text-sm uppercase"><MapPin size={18} /> {t('profile.location')}</label>
                <Input value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} className="bg-white/80 border-green-300 focus:border-green-600 text-lg py-6 rounded-xl" />
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 pt-6">
              <Button onClick={handleSave} disabled={saving} className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-16 py-8 rounded-2xl text-xl shadow-2xl transition-all font-bold">
                {saving ? t('profile.saving') : t('profile.save')}
              </Button>
              {success && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-green-700 font-bold bg-green-100 px-4 py-2 rounded-lg border border-green-200">
                  <CheckCircle2 size={20} /> {t('profile.success')}
                </motion.div>
              )}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card className="border-2 border-emerald-200 bg-white/50 p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Sprout className="text-emerald-600 w-8 h-8" />
            <h3 className="text-emerald-900 font-bold text-xl">{t('profile.statsHeader')}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100 flex items-center gap-4 shadow-sm">
              <div className="p-3 bg-white rounded-lg"><TreeDeciduous className="text-emerald-600" /></div>
              <div>
                <p className="text-sm text-emerald-700 font-medium">Scan Depth</p>
                <p className="text-xl font-bold text-emerald-900">{t('profile.healthStatus')}</p>
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-6 border border-green-100 flex items-center gap-4 shadow-sm">
              <div className="p-3 bg-white rounded-lg"><Leaf className="text-green-600" /></div>
              <div>
                <p className="text-sm text-green-700 font-medium">Member Status</p>
                <p className="text-xl font-bold text-green-900">{t('profile.verified')}</p>
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 flex items-center gap-4 shadow-sm">
              <div className="p-3 bg-white rounded-lg"><Sprout className="text-blue-600" /></div>
              <div>
                <p className="text-sm text-blue-700 font-medium">Account Type</p>
                <p className="text-xl font-bold text-blue-900">{t('profile.standard')}</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}