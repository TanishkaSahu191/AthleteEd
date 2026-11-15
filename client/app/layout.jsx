import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollAnimationManager from '../components/ScrollAnimationManager';

export const metadata = {
  title: 'AthleteEd | Sports Academy & Academic Boarding School',
  description: 'Where elite athletic coaching coexists seamlessly with accredited academic excellence. Live operations platform for student-athletes, coaches, parents, and faculty.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-blue-900 selection:text-white">
        <ScrollAnimationManager />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
