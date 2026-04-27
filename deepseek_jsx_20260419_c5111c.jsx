// app/layout.tsx
import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'], 
  variable: '--font-poppins' 
})

export const metadata: Metadata = {
  title: 'Gym Lovers Cafe | Healthy Food for Fitness Enthusiasts',
  description: 'Premium healthy cafe for gym lovers. High protein meals, healthy drinks, and fitness-focused food delivered to your doorstep.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}