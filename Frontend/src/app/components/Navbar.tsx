import { Link, useLocation } from 'react-router';
import { motion } from 'motion/react';

export function Navbar() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { name: 'Console', path: '/console' },
    { name: 'Upload', path: '/upload' },
    { name: 'Panels & Defects', path: '/panels' },
    { name: 'History', path: '/history' },
    { name: 'Settings', path: '/settings' }
  ];
  
  return (
    <motion.nav
      className="bg-white border-b border-[var(--solar-border)]"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/console" className="text-xl font-semibold text-[var(--solar-navy)]">
                SolarOps
              </Link>
            </motion.div>
            <div className="flex gap-1">
              {navItems.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      isActive(link.path)
                        ? 'bg-[#08306b] text-white'
                        : 'text-[#4292c6] hover:bg-[#eff6ff]'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}