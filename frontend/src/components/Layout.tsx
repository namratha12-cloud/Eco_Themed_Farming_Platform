import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Home,
  Scan,
  Sprout,
  Droplets,
  Cloud,
  PawPrint,
  TrendingUp,
  BookOpen,
  User,
  Leaf
} from 'lucide-react';
import FloatingChatbot from './FloatingChatbot';

import { useLanguage } from '../utils/LanguageContext';
import { Languages } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { name: t('nav.home'), path: '/home', icon: Home },
    { name: t('nav.scan'), path: '/scan', icon: Scan },
    { name: t('nav.soil'), path: '/soil', icon: Sprout },
    { name: t('nav.water'), path: '/water', icon: Droplets },
    { name: t('nav.weather'), path: '/weather', icon: Cloud },
    { name: t('nav.wildlife'), path: '/wildlife', icon: PawPrint },
    { name: t('nav.market'), path: '/market', icon: TrendingUp },
    { name: t('nav.advisory'), path: '/advisory', icon: BookOpen },
    { name: t('nav.profile'), path: '/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 relative overflow-hidden">
      {/* Light Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-emerald-200/15 rounded-full blur-3xl" />
      </div>

      {/* Navigation Bar */}
      <nav className="bg-white/90 backdrop-blur-md shadow-lg border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-6">
              <Link to="/home" className="flex items-center gap-2 group">
                <Sprout className="text-green-600 w-8 h-8 group-hover:scale-110 transition-transform" />
                <span className="text-green-800 font-bold hidden sm:inline">KrishiSarthi AI</span>
              </Link>

              {/* Language Switcher */}
              <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                <Languages size={18} className="text-green-600" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as any)}
                  className="bg-transparent text-sm font-bold text-green-800 focus:outline-none cursor-pointer"
                >
                  <option value="en">English</option>
                  <option value="kn">ಕನ್ನಡ</option>
                  <option value="hi">हिन्दी</option>
                </select>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link key={item.path} to={item.path} className="relative group px-3 py-2">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-green-600' : 'text-green-700 group-hover:text-green-600'} transition-colors`} />
                      <span className={`hidden md:inline ${isActive ? 'text-green-800' : 'text-green-700 group-hover:text-green-800'} transition-colors`}>
                        {item.name}
                      </span>
                    </div>

                    {/* Vine Underline Animation */}
                    {isActive ? (
                      <motion.div
                        layoutId="vine-underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    ) : null}

                    {/* Leaf Hover Animation */}
                    <motion.div
                      className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{ y: [0, -3, 0], rotate: [-5, 5, -5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Leaf className="text-green-500 w-4 h-4" />
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {children}
      </main>

      {/* Floating Chatbot */}
      <FloatingChatbot />

      {/* Decorative Footer Elements */}
      <div className="mt-16 relative">
        <div className="h-20 bg-gradient-to-t from-green-100/50 to-transparent" />
      </div>
    </div>
  );
}