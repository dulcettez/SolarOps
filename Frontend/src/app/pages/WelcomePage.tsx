import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Sun, Mail, MapPin, Sparkles, ArrowRight, Target, Zap } from 'lucide-react';
import backgroundImage from '../../imports/IMG_1658.jpeg';

export function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/40 via-[#0c4a6e]/35 to-[#164e63]/40"></div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[#172554]/20 to-transparent"
          animate={{
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          className="p-6"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#60a5fa] to-[#06b6d4] rounded-xl flex items-center justify-center shadow-xl">
                <Sun className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">SolarOps</h1>
                <p className="text-xs text-[#bfdbfe]">AI-Powered Solar Inspection</p>
              </div>
            </motion.div>

            <motion.button
              onClick={() => navigate('/login')}
              className="px-6 py-3 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/20 transition-all flex items-center gap-2 shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.header>

        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Side - Main Content */}
              <div>
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-[#bfdbfe] text-sm font-medium mb-6 border border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Revolutionizing Solar Maintenance</span>
                </motion.div>

                <motion.h2
                  className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Smart Solar Panel
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#60a5fa] via-[#38bdf8] to-[#22d3ee]">
                    Inspection Platform
                  </span>
                </motion.h2>

                <motion.p
                  className="text-xl text-[#dbeafe] mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Harness the power of AI to detect defects, analyze performance, and optimize your solar energy systems with data-driven insights.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <motion.button
                    onClick={() => navigate('/login')}
                    className="px-8 py-4 bg-gradient-to-r from-[#3b82f6] via-[#0ea5e9] to-[#06b6d4] text-white rounded-xl font-bold shadow-2xl hover:shadow-[#3b82f6]/50 transition-all flex items-center gap-2"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              </div>

              {/* Right Side - Feature Cards */}
              <div className="space-y-4">
                {/* Vision Card */}
                <motion.div
                  className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#60a5fa] to-[#2563eb] rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Our Vision</h3>
                      <p className="text-[#dbeafe] leading-relaxed">
                        To revolutionize solar energy maintenance by making it smarter, faster, and data-driven through the power of artificial intelligence.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Mission Card */}
                <motion.div
                  className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#38bdf8] to-[#0284c7] rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Our Mission</h3>
                      <p className="text-[#dbeafe] leading-relaxed">
                        To provide an intelligent platform that detects solar panel defects, analyzes performance impact, and helps users make better maintenance decisions with clear and actionable insights.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <motion.footer
          className="py-8 px-6 bg-black/30 backdrop-blur-md border-t border-white/10"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div>
                <h3 className="text-lg font-bold text-white mb-3">Contact Us</h3>
                <p className="text-[#bfdbfe] text-sm">
                  Have questions or need support? We're happy to help you improve your solar system performance.
                </p>
              </div>

              <motion.div
                className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.15)' }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-[#60a5fa] to-[#2563eb] rounded-lg flex items-center justify-center shadow-lg">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-[#93c5fd]">Email</p>
                  <p className="text-white font-semibold">solarops@gmail.com</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.15)' }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-[#22d3ee] to-[#0891b2] rounded-lg flex items-center justify-center shadow-lg">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-[#93c5fd]">Location</p>
                  <p className="text-white font-semibold">Riyadh, Saudi Arabia</p>
                </div>
              </motion.div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-[#93c5fd] text-sm">
                © 2026 SolarOps. Empowering solar energy through intelligent maintenance.
              </p>
            </div>
          </div>
        </motion.footer>

        {/* Floating Particles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#60a5fa] rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 1, 0],
              scale: [0, 2, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}
