// components/MealBoxes.tsx
'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

const mealBoxes = [
  { name: 'Sprout Meal Box + Rice', protein: '18g', calories: '350', price: 150, weight: '250g' },
  { name: 'Egg Meal Box + Rice', protein: '22g', calories: '380', price: 150, weight: '220g' },
  { name: 'Broccoli Meal Box + Rice', protein: '12g', calories: '300', price: 150, weight: '250g' },
  { name: 'Grilled Chicken Box + Rice', protein: '38g', calories: '450', price: 160, weight: '350g' },
  { name: 'Paneer Meal Box + Rice', protein: '26g', calories: '420', price: 150, weight: '250g' },
  { name: 'Fish Meal Box + Rice', protein: '45g', calories: '450', price: 150, weight: '450g' },
  { name: 'Grilled Chicken Gym Lover Box', protein: '50g', calories: '300', price: 150, weight: '1 serve' },
  { name: 'Diet Veg', protein: '15g', calories: '200', price: 90, weight: '1 serve' },
  { name: 'Diet Chicken', protein: '25g', calories: '300', price: 170, weight: '1 serve' },
  { name: 'Boiled Chicken (250g)', protein: '50g', calories: '400', price: 120, weight: '250g' },
];

export default function MealBoxes({ openOrderModal }: { openOrderModal: (item: any) => void }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="meal-boxes" className="py-20 bg-white" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Premium <span className="text-green-600">Meal Boxes</span></h2>
          <p className="section-subtitle">
            Complete balanced meals perfect for your fitness goals
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mealBoxes.map((box, idx) => (
            <motion.div
              key={box.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-green-100"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-gray-900">{box.name}</h3>
                <span className="text-green-600 font-bold text-xl">₹{box.price}</span>
              </div>
              
              <div className="flex gap-4 mb-4 text-sm">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  {box.protein} Protein
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  {box.calories} Cal
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  {box.weight}
                </span>
              </div>
              
              <button
                onClick={() => openOrderModal(box)}
                className="w-full py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ShoppingBagIcon className="w-4 h-4" />
                Order Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}