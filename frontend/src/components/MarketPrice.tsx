import { TrendingUp, TrendingDown, Calendar, MapPin, Leaf, Sprout } from 'lucide-react';
import { Button } from './ui/button';

const priceData = {
  wheat: [
    { month: 'Jan', price: 2050 },
    { month: 'Feb', price: 2100 },
    { month: 'Mar', price: 2180 },
    { month: 'Apr', price: 2250 },
    { month: 'May', price: 2350 },
    { month: 'Jun', price: 2420 },
  ],
};

const mandiPrices = [
  { name: 'Delhi Mandi', crop: 'Wheat', price: 2420, change: 5.2, trend: 'up' },
  { name: 'Ludhiana Mandi', crop: 'Rice', price: 3150, change: -2.1, trend: 'down' },
  { name: 'Indore Mandi', crop: 'Soybean', price: 4580, change: 8.5, trend: 'up' },
  { name: 'Nashik Mandi', crop: 'Onion', price: 1850, change: 12.3, trend: 'up' },
  { name: 'Ahmedabad Mandi', crop: 'Cotton', price: 6780, change: -1.5, trend: 'down' },
  { name: 'Hyderabad Mandi', crop: 'Corn', price: 1920, change: 3.8, trend: 'up' },
];

export default function MarketPrice() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2">
          <TrendingUp className="w-8 h-8 text-orange-600" />
          <h1 className="text-green-800">Market Price Prediction</h1>
        </div>
        <p className="text-green-600 max-w-2xl mx-auto">
          AI-driven price trends and selling suggestions to maximize your profits from crop sales.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Price Trend Graph with Vine Style */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border-2 border-green-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-green-800">Wheat Price Trend (₹/quintal)</h3>
            <div className="flex items-center gap-2 text-green-700">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span>+15.2%</span>
            </div>
          </div>

          {/* Vine-style trend graph */}
          <div className="relative h-64 bg-gradient-to-b from-green-50 to-emerald-50 rounded-2xl p-6">
            <svg width="100%" height="100%" viewBox="0 0 600 200" preserveAspectRatio="none">
              {/* Grid lines */}
              <defs>
                <linearGradient id="vineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
              
              {/* Background grid */}
              <line x1="0" y1="50" x2="600" y2="50" stroke="#d1d5db" strokeWidth="1" opacity="0.3" />
              <line x1="0" y1="100" x2="600" y2="100" stroke="#d1d5db" strokeWidth="1" opacity="0.3" />
              <line x1="0" y1="150" x2="600" y2="150" stroke="#d1d5db" strokeWidth="1" opacity="0.3" />

              {/* Area fill */}
              <path
                d="M0,160 L100,140 L200,120 L300,100 L400,70 L500,40 L600,40 L600,200 L0,200 Z"
                fill="url(#vineGradient)"
                opacity="0.2"
              />

              {/* Vine line */}
              <path
                d="M0,160 L100,140 L200,120 L300,100 L400,70 L500,40"
                fill="none"
                stroke="url(#vineGradient)"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Leaf markers at data points */}
              {priceData.wheat.map((point, index) => {
                const x = index * 100;
                const y = 160 - (index * 20);
                return (
                  <g key={index}>
                    <circle cx={x} cy={y} r="6" fill="#10b981" />
                    <circle cx={x} cy={y} r="10" fill="#10b981" opacity="0.3" className="animate-ping" style={{ animationDuration: '2s', animationDelay: `${index * 0.2}s` }} />
                  </g>
                );
              })}
            </svg>

            {/* Month labels */}
            <div className="flex justify-between mt-2">
              {priceData.wheat.map((point) => (
                <div key={point.month} className="text-green-600 text-center">
                  <div className="flex flex-col items-center">
                    <span>{point.month}</span>
                    <span className="text-green-800">₹{point.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prediction badge */}
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-4 border-2 border-green-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600">Predicted Price (July)</p>
                <p className="text-green-800">₹2,580/quintal</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Selling Date Suggestion Panel */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-3xl p-6 shadow-lg border-2 border-orange-300">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-6 h-6 text-orange-600" />
                <h3 className="text-green-800">Best Selling Date</h3>
              </div>

              <div className="bg-white/80 rounded-2xl p-6 space-y-4">
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full shadow-lg">
                    <Calendar className="w-5 h-5" />
                    <span>June 28 - July 5, 2025</span>
                  </div>
                  <p className="text-green-700">
                    Optimal selling window for maximum profit
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 rounded-xl p-3 text-center">
                    <p className="text-green-600">Expected Price</p>
                    <p className="text-green-800">₹2,580</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-3 text-center">
                    <p className="text-green-600">Profit Increase</p>
                    <p className="text-green-800">+15.2%</p>
                  </div>
                </div>
              </div>

              {/* Vine decoration */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent rounded-full" />
                <Leaf className="w-5 h-5 text-green-500" />
                <div className="flex-1 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent rounded-full" />
              </div>

              <div className="space-y-2">
                <h4 className="text-green-800">Why this date?</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-green-700">
                    <Sprout className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                    <span>Peak demand period before festival season</span>
                  </li>
                  <li className="flex items-start gap-2 text-green-700">
                    <Sprout className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                    <span>Limited supply from competing regions</span>
                  </li>
                  <li className="flex items-start gap-2 text-green-700">
                    <Sprout className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                    <span>Favorable weather reducing storage costs</span>
                  </li>
                </ul>
              </div>

              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
                Set Price Alert
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border-2 border-green-200">
              <TrendingUp className="w-6 h-6 text-green-600 mb-2" />
              <p className="text-green-600">Current MSP</p>
              <p className="text-green-800">₹2,125</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border-2 border-green-200">
              <TrendingUp className="w-6 h-6 text-blue-600 mb-2" />
              <p className="text-green-600">Market High</p>
              <p className="text-green-800">₹2,680</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mandi Tables with Tree Icons */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border-2 border-green-200">
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="w-6 h-6 text-green-600" />
          <h3 className="text-green-800">Live Mandi Prices</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mandiPrices.map((mandi, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border-2 border-green-200 hover:shadow-lg transition-shadow"
            >
              {/* Small tree icon decoration */}
              <div className="absolute top-2 right-2 opacity-20">
                <Sprout className="w-8 h-8 text-green-600" />
              </div>

              <div className="relative space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-green-800">{mandi.name}</p>
                    <p className="text-green-600">{mandi.crop}</p>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${
                    mandi.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {mandi.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>{Math.abs(mandi.change)}%</span>
                  </div>
                </div>

                <div className="bg-white/60 rounded-xl p-3">
                  <p className="text-green-600">Current Price</p>
                  <p className="text-green-800">₹{mandi.price}/quintal</p>
                </div>

                {/* Vine separator */}
                <div className="flex items-center gap-2 py-1">
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-green-300 to-transparent" />
                  <Leaf className="w-3 h-3 text-green-500" />
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-green-300 to-transparent" />
                </div>

                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full border-green-300 text-green-700 hover:bg-green-50"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Insights */}
      <div className="bg-gradient-to-br from-amber-100 to-yellow-100 rounded-3xl p-6 shadow-lg border-2 border-amber-300">
        <div className="flex items-center gap-2 mb-4">
          <Leaf className="w-6 h-6 text-green-600" />
          <h3 className="text-green-800">Market Insights</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white/60 rounded-xl p-4 space-y-2">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-green-800">Rising Demand</p>
            <p className="text-green-600">Export orders increasing for wheat and rice</p>
          </div>
          <div className="bg-white/60 rounded-xl p-4 space-y-2">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-green-800">Seasonal Trend</p>
            <p className="text-green-600">Prices typically peak in early July</p>
          </div>
          <div className="bg-white/60 rounded-xl p-4 space-y-2">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-green-800">Regional Demand</p>
            <p className="text-green-600">Northern mandis showing higher prices</p>
          </div>
        </div>
      </div>
    </div>
  );
}
