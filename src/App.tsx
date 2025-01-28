import { motion } from 'framer-motion';
import { Container } from 'lucide-react';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
import LogoWall from './components/LogoWall';
import About from './components/About'; // Changed import here
import Services from './components/Services';
import OpenSource from './components/OpenSource';
import SpeakingEngagements from './components/SpeakingEngagements';
import Certifications from './components/Certifications';
import Hobbies from './components/Hobbies';
import NotFound from './components/NotFound';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const navLinks = [
  { path: '/about-me', label: 'About Me' },
  { path: '/services', label: 'Services' },
  { path: '/open-source', label: 'Open Source' },
  { path: '/speaking-engagements', label: 'Speaking Engagements' },
  { path: '/certifications', label: 'Certifications' },
  { path: '/hobbies', label: 'Hobbies' },
  { path: '/projects', label: 'Projects' },
  { path: '/contact', label: 'Contact' },
];

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 pointer-events-none" />

        <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-sm z-50 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center space-x-2">
                <Container className="w-8 h-8 text-cyan-400" />
                <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Venkatesh Portfolio</Link>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="hidden md:flex items-center space-x-8">
                {navLinks.map((item) => (
                  <Link key={item.label} to={item.path} className="text-gray-300 hover:text-cyan-400 transition-colors text-lg">
                    {item.label}
                  </Link>
                ))}
              </motion.div>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about-me" element={<About />} /> {/* Changed component here */}
            <Route path="/services" element={<Services />} />
            <Route path="/open-source" element={<OpenSource />} />
            <Route path="/speaking-engagements" element={<SpeakingEngagements />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/hobbies" element={<Hobbies />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer className="bg-gray-900/80 backdrop-blur-sm py-8 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
            <p>© 2024 Venkatesh Portfolio. Built with React & Framer Motion.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
