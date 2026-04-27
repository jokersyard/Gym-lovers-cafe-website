// components/Contact.tsx
'use client';

import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { PhoneIcon, MapPinIcon, ClockIcon, EnvelopeIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, connect to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-green-900 to-green-800 text-white" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title text-white">Get In <span className="text-green-300">Touch</span></h2>
          <p className="text-green-100 max-w-2xl mx-auto">
            Have questions? Want to place a bulk order? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4 p-5 bg-white/10 rounded-2xl backdrop-blur-sm">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <PhoneIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Call Us</h3>
                <a href="tel:9896338337" className="text-green-200 text-lg hover:text-white transition">
                  9896338337
                </a>
                <p className="text-green-200"> | 7404012626</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-white/10 rounded-2xl backdrop-blur-sm">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <MapPinIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Visit Us</h3>
                <p className="text-green-200">
                  Shop No. 3, Main Gandhi Road,<br />
                  Aya Nagar, New Delhi - 110034
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-white/10 rounded-2xl backdrop-blur-sm">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <ClockIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Opening Hours</h3>
                <p className="text-green-200">
                  Monday - Sunday: 8:00 AM - 11:00 PM<br />
                  Free Home Delivery: Min. Order ₹200
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-green-200 focus:outline-none focus:border-green-400 transition"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-green-200 focus:outline-none focus:border-green-400 transition"
              required
            />
            <textarea
              rows={4}
              placeholder="Your Message (e.g., order details, special requests)"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-green-200 focus:outline-none focus:border-green-400 transition resize-none"
              required
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-green-500 hover:bg-green-400 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Send Message
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>
            {submitted && (
              <p className="text-green-300 text-center">Thanks! We'll get back to you soon.</p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}