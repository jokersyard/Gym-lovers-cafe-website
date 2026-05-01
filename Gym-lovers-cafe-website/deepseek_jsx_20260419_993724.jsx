// components/HealthyDrinks.tsx
'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { ShoppingBagIcon, BeakerIcon } from '@heroicons/react/24/outline';

const drinks = [
  { name: 'Protein Smoothie', price: 100, weight: '400ml', protein: '25g', calories: '180' },
  { name: 'Hi-Protein Chocolate', price: 150, weight: '400ml', protein: '30g', calories: '220' },
  { name: 'Weight Gain Shake', price: 150, weight: '500ml', protein: '20g', calories: '450' },
  { name: 'Banana Papaya Shake', price: 100, weight: '400ml', protein: '8g', calories: '200' },
  { name: 'Strawberry Chia Seeds Shake', price: 120, weight: '400ml', protein: '10g', calories: '210' },
  { name: 'Blue Curacao', price: 100, weight: '350ml', protein: '0g', calories: '150' },
];

export default function HealthyDrinks({ openOrderModal }: { openOrderModal: (item: any) => void }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="drinks" className="py-20 bg-green-50/30" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-green-100 rounded-full px-4 py-2 mb-4">
            <BeakerIcon className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-medium">Healthy Drinks</span>
          </div>
          <h2 className="section-title">Refreshing <span className="text-green-600">Protein Shakes</span></h2>
          <p className="section-subtitle">
            Post-workout recovery drinks made with premium ingredients
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drinks.map((drink, idx) => (
            <motion.div
              key={drink.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="bg-gradient-to-r from-green-500 to-green-400 p-3 text-white text-center">
                <p className="text-sm font-medium">{drink.protein} Protein • {drink.calories} Cal</p>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{drink.name}</h3>
                <p className="text-gray-500 text-sm mb-3">{drink.weight}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">₹{drink.price}</span>
                  <button
                    onClick={() => openOrderModal(drink)}
                    className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300"
                  >
                    <ShoppingBagIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}