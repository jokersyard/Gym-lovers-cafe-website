// components/About.tsx
'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { FireIcon, HeartIcon, ClockIcon, StarIcon } from '@heroicons/react/24/outline';

const features = [
  { icon: FireIcon, title: 'High Protein', description: '40g+ protein per meal' },
  { icon: HeartIcon, title: 'Clean Ingredients', description: 'No preservatives, no MSG' },
  { icon: ClockIcon, title: 'Freshly Made', description: 'Prepared on order' },
  { icon: StarIcon, title: 'Dietitian Approved', description: 'Balanced nutrition' },
];

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="py-20 bg-white" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Why Choose <span className="text-green-600">Gym Lovers Cafe</span></h2>
          <p className="section-subtitle">
            We're passionate about helping you achieve your fitness goals through delicious, nutritious food
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-white hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-gray-100"
        >
          {[
            { value: '50+', label: 'Healthy Meals' },
            { value: '500+', label: 'Happy Customers' },
            { value: '30min', label: 'Avg Delivery' },
            { value: '4.9', label: 'Customer Rating' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-green-600">{stat.value}</p>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}