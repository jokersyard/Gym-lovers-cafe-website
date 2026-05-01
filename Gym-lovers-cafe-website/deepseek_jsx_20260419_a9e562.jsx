// components/Footer.tsx
import { HeartIcon } from '@heroicons/react/24/outline';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div>
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="text-white font-bold">GYM LOVERS CAFE</span>
            </div>
            <p className="text-sm">Eat • Train • Repeat</p>
          </div>
          
          <div className="flex gap-6">
            <a href="#home" className="hover:text-green-400 transition">Home</a>
            <a href="#menu" className="hover:text-green-400 transition">Menu</a>
            <a href="#contact" className="hover:text-green-400 transition">Contact</a>
          </div>
          
          <p className="text-sm flex items-center gap-1">
            Made with <HeartIcon className="w-4 h-4 text-red-400" /> for fitness lovers
          </p>
        </div>
        
        <div className="border-t border-gray-800 mt-6 pt-6 text-center text-xs">
          <p>© 2024 Gym Lovers Cafe. All rights reserved. | Free Home Delivery on orders above ₹200</p>
          <p className="mt-1">📍 Aya Nagar, New Delhi | 📞 9896338337, 7404012626</p>
        </div>
      </div>
    </footer>
  );
}