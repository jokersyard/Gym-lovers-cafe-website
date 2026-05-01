// components/WrapsSandwiches.tsx
'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

const wraps = [
  { name: 'Chicken Wrap', protein: '24g', calories: '280', price: 100, weight: '240g' },
  { name: 'Paneer Wrap', protein: '20g', calories: '380', price: 100, weight: '200g' },
  { name: 'Broccoli Wrap', protein: '12g', calories: '220', price: 100, weight: '220g' },
  { name: 'Egg Chicken Wrap', protein: '30g', calories: '350', price: 120, weight: '250g' },
  { name: 'Peanut Butter Banana Wrap', protein: '14g', calories: '390', price: 100, weight: '180g' },
  { name: 'Chicken BBQ Wrap', protein: '45g', calories: '300', price: 100, weight: '1 serve' },
];

const sandwiches = [
  { name: 'Chicken Sandwich', protein: '25g', calories: '280', price: 120, weight: '240g' },
  { name: 'Paneer Sandwich', protein: '20g', calories: '350', price: 100, weight: '200g' },
  { name: 'Broccoli Sandwich', protein: '12g', calories: '220', price: 100, weight: '220g' },
  { name: 'Egg Chicken Sandwich', protein: '30g', calories: '350', price: 120, weight: '300g' },
  { name: 'Peanut Butter Banana', protein: '14g', calories: '390', price: 100, weight: '140g' },
];

export default function WrapsSandwiches({ openOrderModal }: { openOrderModal: (item: any) => void }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="wraps" className="py-20 bg-white" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Wraps & <span className="text-green-600">Sandwiches</span></h2>
          <p className="section-subtitle">
            Perfect on-the-go meals packed with protein
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Wraps Section */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-green-600 rounded-full"></span>
              Signature Wraps
            </h3>
            <div className="space-y-4">
              {wraps.map((wrap, idx) => (
                <motion.div
                  key={wrap.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: idx * 0.05 }}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-all duration-300"
                >
                  <div>
                    <h4 className="font-semibold text-gray-900">{wrap.name}</h4>
                    <div className="flex gap-3 text-xs text-gray-500 mt-1">
                      <span>{wrap.protein} Protein</span>
                      <span>{wrap.calories} Cal</span>
                      <span>{wrap.weight}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-green-600">₹{wrap.price}</span>
                    <button
                      onClick={() => openOrderModal(wrap)}
                      className="p-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition"
                    >
                      <ShoppingBagIcon className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sandwiches Section */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-green-600 rounded-full"></span>
              Gourmet Sandwiches
            </h3>
            <div className="space-y-4">
              {sandwiches.map((sandwich, idx) => (
                <motion.div
                  key={sandwich.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: idx * 0.05 }}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-all duration-300"
                >
                  <div>
                    <h4 className="font-semibold text-gray-900">{sandwich.name}</h4>
                    <div className="flex gap-3 text-xs text-gray-500 mt-1">
                      <span>{sandwich.protein} Protein</span>
                      <span>{sandwich.calories} Cal</span>
                      <span>{sandwich.weight}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-green-600">₹{sandwich.price}</span>
                    <button
                      onClick={() => openOrderModal(sandwich)}
                      className="p-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition"
                    >
                      <ShoppingBagIcon className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}