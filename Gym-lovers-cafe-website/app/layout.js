import './globals.css'

export const metadata = {
  title: 'Gym Lover\'s Cafe',
  description: 'Healthy meals for fitness enthusiasts',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}