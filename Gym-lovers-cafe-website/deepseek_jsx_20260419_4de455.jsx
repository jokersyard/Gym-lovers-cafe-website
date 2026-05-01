// components/Hero.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowRightIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-50/30 -z-10" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-green-200 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-green-300 rounded-full blur-3xl opacity-20 -z-10" />

      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-green-100 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
              <span className="text-green-700 text-sm font-medium">Eat • Train • Repeat</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
              Fuel Your
              <span className="text-green-600 block">Fitness Journey</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Premium healthy meals crafted for gym lovers. High protein, clean ingredients, 
              and delicious flavors delivered to your doorstep.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#menu" className="btn-primary inline-flex items-center gap-2 group">
                Explore Menu
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition" />
              </a>
              <a href="tel:9896338337" className="btn-outline inline-flex items-center gap-2">
                <PhoneIcon className="w-4 h-4" />
                Call Now
              </a>
            </div>
            
            <div className="flex items-center gap-6 mt-8 pt-4 border-t border-gray-200">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-green-200 border-2 border-white flex items-center justify-center">
                    <span className="text-green-700 text-xs font-bold">★</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="font-semibold text-gray-900">500+ Happy Customers</p>
                <p className="text-sm text-gray-500">Rated 4.9/5 on Zomato</p>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-6 border border-green-100">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <p className="text-3xl font-bold text-green-600">40g+</p>
                  <p className="text-sm text-gray-600">Protein Per Meal</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <p className="text-3xl font-bold text-green-600">30min</p>
                  <p className="text-sm text-gray-600">Fast Delivery</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Grilled Lemon Chicken</span>
                  <span className="text-green-600 font-bold">₹150</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Protein Smoothie</span>
                  <span className="text-green-600 font-bold">₹100</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Chicken Wrap</span>
                  <span className="text-green-600 font-bold">₹100</span>
                </div>
              </div>
              
              <div className="mt-6 p-3 bg-green-600 rounded-xl text-white text-center">
                <p className="font-semibold">Free Home Delivery</p>
                <p className="text-sm">Minimum Order: ₹200</p>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -top-5 -right-5 bg-white rounded-full shadow-lg p-3 animate-bounce">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">★</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}