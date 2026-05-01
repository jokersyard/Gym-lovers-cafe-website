// components/OrderModal.tsx
'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, PhoneIcon, MinusIcon, PlusIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function OrderModal({ isOpen, onClose, item }: { isOpen: boolean; onClose: () => void; item: any }) {
  const [quantity, setQuantity] = useState(1);

  if (!item) return null;

  const totalPrice = item.price * quantity;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-50 p-8 shadow-2xl transition-all border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <Dialog.Title className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <ShoppingCartIcon className="w-6 h-6 text-green-600" />
                    Order {item.name}
                  </Dialog.Title>
                  <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                    <p className="text-green-800 font-semibold text-lg">{item.name}</p>
                    <p className="text-green-700 font-bold text-3xl mt-1">₹{item.price}</p>
                    {item.description && (
                      <p className="text-green-600 text-sm mt-2">{item.description}</p>
                    )}
                    {item.protein && (
                      <div className="flex flex-wrap gap-3 mt-3 text-sm">
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">💪 {item.protein} Protein</span>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">🔥 {item.calories} Cal</span>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">⚖️ {item.weight}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                    <span className="font-medium text-gray-700">Quantity:</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
                      >
                        <MinusIcon className="w-4 h-4 text-red-600" />
                      </button>
                      <span className="font-bold text-lg w-8 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 rounded-full bg-green-100 hover:bg-green-200 transition-colors"
                      >
                        <PlusIcon className="w-4 h-4 text-green-600" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-blue-800">Total:</span>
                      <span className="font-bold text-2xl text-blue-900">₹{totalPrice}</span>
                    </div>
                  </div>

                  <div className="text-center space-y-3">
                    <p className="text-gray-600">Call us to place your order instantly:</p>
                    <a
                      href="tel:9896338337"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-full transition-all transform hover:scale-105 shadow-lg"
                    >
                      <PhoneIcon className="w-5 h-5" />
                      Call 9896338337
                    </a>
                    <p className="text-xs text-gray-500">
                      Free Home Delivery on orders above ₹200 • Fresh & Healthy Meals
                    </p>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}