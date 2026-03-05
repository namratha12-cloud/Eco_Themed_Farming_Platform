import { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, PawPrint, AlertTriangle, Bell, TreeDeciduous, Leaf } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useLanguage } from '../utils/LanguageContext';

export default function WildlifeDetection() {
  const { t } = useLanguage();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [detecting, setDetecting] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUploadedImage(ev.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDetect = async () => {
    if (!selectedFile) return;
    setDetecting(true);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const resp = await fetch('http://localhost:5000/detect-wildlife', {
        method: 'POST',
        body: formData
      });

      if (resp.ok) {
        const data = await resp.json();
        const locations = t('wildlife.mock_locations') || ['Northern Field', 'South Field'];
        const times = t('wildlife.mock_times') || ['Just now', '15 mins ago'];

        setResult({
          animal: data.animal,
          confidence: data.confidence,
          threatLevel: data.threatLevel,
          count: data.count,
          location: locations[Math.floor(Math.random() * locations.length)],
          time: data.animal === 'Unknown' ? times[Math.floor(Math.random() * times.length)] : 'Just now',
          actions: t('wildlife.actions'),
          prevention: t('wildlife.prevention')
        });
      }
    } catch (e) {
      console.error("Wildlife detection failed", e);
    } finally {
      setDetecting(false);
    }
  };

  const handleNotifyForest = () => {
    alert(t('wildlife.notified'));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        className="text-center relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="inline-flex items-center gap-3 mb-2">
          <PawPrint className="text-green-700 w-10 h-10" />
          <h1 className="text-green-800">{t('wildlife.header')}</h1>
          <TreeDeciduous className="text-emerald-700 w-10 h-10" />
        </div>
        <p className="text-green-700">{t('wildlife.subtitle')}</p>
      </motion.div>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="relative border-4 border-green-600 bg-gradient-to-br from-green-100 to-emerald-100 overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1677915762983-c64fc9152c45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjB3aWxkbGlmZSUyMG5hdHVyZXxlbnwxfHx8fDE3NjM2NDkwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />

          <div className="relative p-8 space-y-6">
            {!uploadedImage ? (
              <div className="text-center space-y-4">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mx-auto w-32 h-32 bg-green-700 rounded-full flex items-center justify-center"
                >
                  <Upload className="text-white w-16 h-16" />
                </motion.div>
                <div>
                  <p className="text-green-900 mb-2 font-bold">{t('wildlife.uploadTitle')}</p>
                  <p className="text-green-700">{t('wildlife.uploadDesc')}</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="wildlife-upload"
                />
                <label htmlFor="wildlife-upload">
                  <Button
                    className="bg-gradient-to-r from-green-700 to-emerald-700 hover:from-green-800 hover:to-emerald-800 text-white"
                    asChild
                  >
                    <span className="cursor-pointer inline-flex items-center gap-2">
                      <PawPrint className="w-5 h-5" />
                      {t('wildlife.selectBtn')}
                    </span>
                  </Button>
                </label>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-xl overflow-hidden border-2 border-green-600">
                  <img
                    src={uploadedImage}
                    alt="Uploaded wildlife"
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={handleDetect}
                    disabled={detecting}
                    className="bg-gradient-to-r from-green-700 to-emerald-700 hover:from-green-800 hover:to-emerald-800 text-white px-8 py-6"
                  >
                    {detecting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <PawPrint className="w-5 h-5 mr-2" />
                        </motion.div>
                        {t('wildlife.detecting')}
                      </>
                    ) : (
                      <>
                        <PawPrint className="w-5 h-5 mr-2" />
                        {t('wildlife.detectBtn')}
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => {
                      setUploadedImage(null);
                      setResult(null);
                    }}
                    variant="outline"
                    className="border-green-600 text-green-700 hover:bg-green-50"
                  >
                    {t('wildlife.uploadNew')}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Results */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card className="border-4 border-red-400 bg-gradient-to-br from-red-50 to-orange-50 relative overflow-hidden">
            <div className="p-6 space-y-4 relative">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-red-200">
                    <PawPrint className="text-red-600 w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-red-900">{t('wildlife.resultHeader')}: {t(`wildlife.animals.${result.animal}`)}</h3>
                    <p className="text-red-700">{t('scanner.confidence')}: {result.confidence}% | {t('wildlife.count')}: {result.count}</p>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-full ${result.threatLevel === 'high' ? 'bg-red-200 text-red-800' :
                  result.threatLevel === 'medium' ? 'bg-orange-200 text-orange-800' :
                    'bg-yellow-200 text-yellow-800'
                  }`}>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span>{t(`scanner.${result.threatLevel}`)} {t('wildlife.threat')}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-white/60 rounded-lg p-3 border-2 border-amber-700/30">
                  <p className="text-green-700 font-bold">{t('wildlife.location')}</p>
                  <p className="text-green-900">{result.location}</p>
                </div>
                <div className="bg-white/60 rounded-lg p-3 border-2 border-amber-700/30">
                  <p className="text-green-700 font-bold">{t('wildlife.time')}</p>
                  <p className="text-green-900">{result.time}</p>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex justify-center">
            <Button
              onClick={handleNotifyForest}
              className="bg-gradient-to-r from-green-700 to-emerald-700 hover:from-green-800 hover:to-emerald-800 text-white px-12 py-8"
            >
              <div className="flex items-center gap-3 font-bold text-lg">
                <Bell className="w-6 h-6" />
                <span>{t('wildlife.notifyBtn')}</span>
                <TreeDeciduous className="w-6 h-6" />
              </div>
            </Button>
          </div>

          <Card className="border-4 border-amber-700 bg-gradient-to-br from-amber-100 to-orange-100 relative overflow-hidden">
            <div className="p-6 space-y-4 relative">
              <div className="flex items-center gap-3">
                <AlertTriangle className="text-amber-800 w-8 h-8" />
                <h3 className="text-amber-900">{t('wildlife.immediateActions')}</h3>
              </div>
              <ul className="space-y-2">
                {Array.isArray(result.actions) ? result.actions.map((action: string, index: number) => (
                  <li key={index} className="flex items-start gap-3 bg-white/40 p-3 rounded-lg border-2 border-amber-700/30">
                    <Leaf className="text-amber-700 w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-amber-800 font-medium">{action}</span>
                  </li>
                )) : null}
              </ul>
            </div>
          </Card>

          <Card className="border-4 border-green-600 bg-gradient-to-br from-green-100 to-emerald-100 relative overflow-hidden">
            <div className="p-6 space-y-4 relative">
              <div className="flex items-center gap-3">
                <TreeDeciduous className="text-green-700 w-8 h-8" />
                <h3 className="text-green-900">{t('wildlife.longTerm')}</h3>
              </div>
              <ul className="space-y-2">
                {Array.isArray(result.prevention) ? result.prevention.map((method: string, index: number) => (
                  <li key={index} className="flex items-start gap-3 bg-white/40 p-3 rounded-lg border-2 border-green-700/30">
                    <PawPrint className="text-green-700 w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-green-800 font-medium">{method}</span>
                  </li>
                )) : null}
              </ul>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
