// components/Menu.tsx
'use client';

import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

const menuItems = [
  { category: 'Healthy Meals', items: [
    { name: 'Grilled Lemon Chicken', protein: '42g', calories: '320', price: 150, weight: '400g' },
    { name: 'BBQ Chicken Strips', protein: '40g', calories: '340', price: 150, weight: '400g' },
    { name: 'Boiled Egg Whites (5)', protein: '18g', calories: '90', price: 100, weight: '200g' },
    { name: 'Cream Corn Mushroom', protein: '18g', calories: '90', price: 200, weight: '200g' },
    { name: 'Roasted Chicken Breast', protein: '44g', calories: '330', price: 150, weight: '400g' },
    { name: 'Mashed Potato', protein: '6g', calories: '210', price: 150, weight: '80g' },
    { name: 'Chicken Fajita', protein: '40g', calories: '340', price: 120, weight: '400g' },
    { name: 'Creamy Chicken Breast', protein: '46g', calories: '420', price: 200, weight: '400g' },
    { name: 'Roasted Fish', protein: '30g', calories: '300', price: 160, weight: '300g' },
    { name: 'Oat Meal', protein: '30g', calories: '600', price: 100, weight: '100g' },
  ]},
  { category: 'Omelettes', items: [
    { name: 'Bread Omelette', price: 80, weight: '1 serve' },
    { name: 'Classic Omelette', price: 70, weight: '1 serve' },
    { name: 'Chicken Omelette', price: 120, weight: '1 serve' },
    { name: 'Fresh Garden Omelette', price: 120, weight: '1 serve' },
  ]},
  { category: 'Rolls', items: [
    { name: 'Veg Roll', price: 40, weight: '1 piece' },
    { name: 'Egg Roll', price: 50, weight: '1 piece' },
    { name: 'Chicken Roll', price: 60, weight: '1 piece' },
    { name: 'Paneer Roll', price: 50, weight: '1 piece' },
  ]},
  { category: 'Pancakes', items: [
    { name: 'Pancake', price: 150, weight: '2 pcs' },
    { name: 'High Protein (Chocolate)', price: 170, weight: '2 pcs' },
    { name: 'High Protein (Vanilla)', price: 170, weight: '2 pcs' },
    { name: 'High Protein + Dry Fruits', price: 200, weight: '2 pcs' },
  ]},
  { category: 'Soups', items: [
    { name: 'Veg Soup', price: 50, weight: '250ml' },
    { name: 'Tofu Soup', price: 70, weight: '250ml' },
    { name: 'Mushroom Soup', price: 70, weight: '250ml' },
    { name: 'Lemon Coriander Soup', price: 70, weight: '250ml' },
    { name: 'Sweet Corn Soup', price: 80, weight: '250ml' },
    { name: 'Tomato Soup', price: 90, weight: '250ml' },
  ]},
  { category: 'Noodles', items: [
    { name: 'Chili Garlic Noodles', price: 160, weight: '90g' },
    { name: 'Green Chili Noodles', price: 90, weight: '50g' },
    { name: 'Veg Noodles', price: 90, weight: '50g' },
    { name: 'Paneer Noodles', price: 100, weight: '60g' },
    { name: 'Hakka Noodles', price: 110, weight: '70g' },
    { name: 'Singapuri Noodles', price: 120, weight: '70g' },
    { name: 'Mushroom Noodles', price: 120, weight: '70g' },
    { name: 'Special Noodles', price: 100, weight: '60g' },
  ]},
];

export default function Menu({ openOrderModal }: { openOrderModal: (item: any) => void }) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const categories = menuItems.map(m => m.category);
  const currentItems = menuItems[activeCategory].items;

  return (
    <section id="menu" className="py-20 bg-green-50/30" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Our <span className="text-green-600">Menu</span></h2>
          <p className="section-subtitle">
            Carefully crafted meals with the perfect balance of protein, carbs, and healthy fats
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((category, idx) => (
            <button
              key={category}
              onClick={() => setActiveCategory(idx)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === idx
                  ? 'bg-green-600 text-white shadow-lg shadow-green-600/30'
                  : 'bg-white text-gray-700 hover:bg-green-100'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Menu Items Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {currentItems.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition">
                    {item.name}
                  </h3>
                  <span className="text-green-600 font-bold text-lg">₹{item.price}</span>
                </div>
                
                <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-4">
                  {item.protein && (
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      {item.protein} Protein
                    </span>
                  )}
                  {item.calories && (
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      {item.calories} Cal
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    {item.weight}
                  </span>
                </div>
                
                <button
                  onClick={() => openOrderModal(item)}
                  className="w-full py-2 rounded-lg border-2 border-green-600 text-green-600 font-medium hover:bg-green-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingBagIcon className="w-4 h-4" />
                  Order Now
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}