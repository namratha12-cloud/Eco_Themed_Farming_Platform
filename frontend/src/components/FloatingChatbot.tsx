import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Sprout, Send } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useLanguage } from '../utils/LanguageContext';

export default function FloatingChatbot() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; message: string }>>([
    {
      role: 'ai',
      message: t('chatbot.welcome')
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const suggestions = t('chatbot.suggestions');

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setChatMessages(prev => [...prev, { role: 'user', message: userMessage }]);
    setIsTyping(true);
    setMessage('');

    try {
      const resp = await fetch('http://localhost:5000/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          lang: useLanguage().language
        })
      });

      if (resp.ok) {
        const data = await resp.json();
        setChatMessages(prev => [...prev, { role: 'ai', message: data.message }]);
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      console.error(err);
      setChatMessages(prev => [...prev, { role: 'ai', message: t('chatbot.error') }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full shadow-2xl flex items-center justify-center z-50 group border-2 border-white/20"
          >
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <Sprout className="text-white w-8 h-8" />
            </motion.div>
            <motion.div className="absolute inset-0 rounded-full bg-green-500" animate={{ scale: [1, 1.5], opacity: [0.5, 0] }} transition={{ duration: 2, repeat: Infinity }} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 100, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 100, scale: 0.8 }} transition={{ type: "spring", damping: 20 }} className="fixed bottom-6 right-6 w-96 z-50">
            <Card className="border-4 border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 shadow-2xl overflow-hidden rounded-3xl">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                    <Sprout className="text-white w-8 h-8" />
                  </motion.div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{t('chatbot.title')}</h3>
                    <p className="text-green-100 text-xs font-medium">{t('chatbot.subtitle')}</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 rounded-full p-2 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="h-96 overflow-y-auto p-4 space-y-4 bg-white/60">
                {chatMessages.map((msg, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${msg.role === 'user' ? 'bg-green-600 text-white rounded-br-none' : 'bg-white border-2 border-green-200 text-green-900 rounded-bl-none'}`}>
                      {msg.role === 'ai' && (
                        <div className="flex items-center gap-2 mb-2 pb-1 border-b border-green-100">
                          <Sprout className="text-green-600 w-4 h-4" />
                          <span className="text-green-700 text-[10px] font-bold uppercase tracking-wider">{t('chatbot.aiLabel')}</span>
                        </div>
                      )}
                      <p className="text-sm font-medium leading-relaxed">{msg.message}</p>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="bg-white border-2 border-green-200 p-3 rounded-2xl rounded-bl-none shadow-sm">
                      <div className="flex gap-2">
                        {[0, 1, 2].map((i) => (
                          <motion.div key={i} animate={{ opacity: [0.4, 1, 0.4], y: [0, -2, 0] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} className="w-2.5 h-2.5 bg-green-600 rounded-full" />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {chatMessages.length === 1 && (
                <div className="p-4 border-t-2 border-green-200 bg-green-50/50">
                  <p className="text-[10px] text-green-700 mb-3 font-bold uppercase tracking-widest">{t('chatbot.quickQuestions')}</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion: string, index: number) => (
                      <motion.button key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setMessage(suggestion)} className="text-xs px-4 py-2 bg-white border-2 border-green-200 rounded-xl text-green-700 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all font-bold shadow-sm">
                        {suggestion}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-4 border-t-2 border-green-200 bg-white/95">
                <div className="flex gap-3 items-end">
                  <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder={t('chatbot.placeholder')} className="border-2 border-green-200 focus:border-green-500 rounded-2xl resize-none text-sm font-medium p-3 bg-gray-50/50 shadow-inner" rows={2} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }} />
                  <Button onClick={handleSend} disabled={!message.trim() || isTyping} className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white h-12 w-12 rounded-2xl shadow-lg flex-shrink-0">
                    <Send className="w-6 h-6" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
