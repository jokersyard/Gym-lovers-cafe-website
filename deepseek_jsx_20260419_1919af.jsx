// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Menu from '@/components/Menu';
import MealBoxes from '@/components/MealBoxes';
import HealthyDrinks from '@/components/HealthyDrinks';
import WrapsSandwiches from '@/components/WrapsSandwiches';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import OrderModal from '@/components/OrderModal';

export default function Home() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOrderModalOpen) {
        setIsOrderModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOrderModalOpen]);

  const openOrderModal = (item: any) => {
    setSelectedItem(item);
    setIsOrderModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar />
      <Hero />
      <About />
      <Menu openOrderModal={openOrderModal} />
      <MealBoxes openOrderModal={openOrderModal} />
      <HealthyDrinks openOrderModal={openOrderModal} />
      <WrapsSandwiches openOrderModal={openOrderModal} />
      <Contact />
      <Footer />
      <ScrollToTop />
      <OrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
        item={selectedItem}
      />
    </main>
  );
}