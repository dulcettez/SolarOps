import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { SearchInput } from '../components/SearchInput';
import { FilterDropdown } from '../components/FilterDropdown';
import { PriorityBadge } from '../components/PriorityBadge';
import { panels, Priority } from '../data/mockData';
import { AlertCircle, Zap, DollarSign, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

export function PanelsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const filteredPanels = panels.filter(panel => {
    const matchesSearch = panel.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         panel.defectType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === 'All' || panel.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  }).sort((a, b) => {
    const priorityOrder = { High: 0, Medium: 1, Low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const highPriorityCount = panels.filter(p => p.priority === 'High').length;
  const mediumPriorityCount = panels.filter(p => p.priority === 'Medium').length;
  const lowPriorityCount = panels.filter(p => p.priority === 'Low').length;

  const getNextMaintenanceDate = (panel: typeof panels[0]) => {
    // Generate a date based on priority and status
    const today = new Date('2026-04-09');
    const daysToAdd = panel.priority === 'High' ? 2 : panel.priority === 'Medium' ? 5 : 10;
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + daysToAdd);
    return nextDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const getRecommendedAction = (panel: typeof panels[0]) => {
    if (panel.defectType === 'Hotspot') return 'Inspect junction box';
    if (panel.defectType === 'Soiling') return 'Schedule cleaning immediately';
    if (panel.defectType === 'Cracking') return 'Replace panel';
    if (panel.defectType === 'Bird Dropping') return 'Clean and monitor';
    if (panel.defectType === 'Shading') return 'Inspect shading source';
    return 'Monitor performance';
  };

  return (
    <div className="min-h-screen bg-[var(--solar-bg)]">
      <Navbar />

      <div className="max-w-[1440px] mx-auto px-6 py-8">
        <motion.h1
          className="text-3xl font-semibold text-[var(--solar-navy)] mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Panels & Defects
        </motion.h1>
        <motion.p
          className="text-[var(--solar-text-muted)] mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Detailed view of all detected panel defects with inspection history
        </motion.p>

        {/* Priority Summary Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <motion.div
            className="bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] rounded-xl p-8 text-white shadow-xl relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.7, delay: 0.1, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.05, y: -8, boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)" }}
          >
            <motion.div
              className="absolute inset-0 bg-white opacity-10"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
              }}
            />
            <motion.div
              className="text-6xl font-bold mb-3 relative z-10"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 200 }}
            >
              {highPriorityCount}
            </motion.div>
            <div className="text-[#dbeafe] font-semibold text-lg">High Priority</div>
            <div className="text-sm text-[#bfdbfe] mt-2">Immediate attention required</div>
          </motion.div>
          <motion.div
            className="bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] rounded-xl p-8 text-white shadow-xl relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.05, y: -8, boxShadow: "0 25px 50px -12px rgba(14, 165, 233, 0.5)" }}
          >
            <motion.div
              className="absolute inset-0 bg-white opacity-10"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
                delay: 1
              }}
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
              }}
            />
            <motion.div
              className="text-6xl font-bold mb-3 relative z-10"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 200 }}
            >
              {mediumPriorityCount}
            </motion.div>
            <div className="text-[#e0f2fe] font-semibold text-lg">Medium Priority</div>
            <div className="text-sm text-[#bae6fd] mt-2">Schedule within this week</div>
          </motion.div>
          <motion.div
            className="bg-gradient-to-br from-[#06b6d4] to-[#0891b2] rounded-xl p-8 text-white shadow-xl relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.7, delay: 0.3, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.05, y: -8, boxShadow: "0 25px 50px -12px rgba(6, 182, 212, 0.5)" }}
          >
            <motion.div
              className="absolute inset-0 bg-white opacity-10"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
                delay: 2
              }}
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
              }}
            />
            <motion.div
              className="text-6xl font-bold mb-3 relative z-10"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 200 }}
            >
              {lowPriorityCount}
            </motion.div>
            <div className="text-[#cffafe] font-semibold text-lg">Low Priority</div>
            <div className="text-sm text-[#a5f3fc] mt-2">Monitor and maintain</div>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          className="flex gap-4 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.div
            className="flex-1"
            whileHover={{ scale: 1.01 }}
          >
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by Panel ID or Defect Type..."
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FilterDropdown
              label="Priority"
              value={priorityFilter}
              onChange={setPriorityFilter}
              options={['All', 'High', 'Medium', 'Low']}
            />
          </motion.div>
        </motion.div>

        {/* Panel Cards */}
        <div className="space-y-4">
          {filteredPanels.map((panel, index) => (
            <motion.div
              key={panel.id}
              className="bg-white rounded-xl border-2 border-[var(--solar-border)] p-6 shadow-lg hover:shadow-2xl transition-all relative overflow-hidden"
              initial={{ opacity: 0, x: -50, rotateX: -15 }}
              animate={{ opacity: 1, x: 0, rotateX: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              whileHover={{
                scale: 1.02,
                y: -4,
                borderColor: panel.priority === 'High' ? '#2563eb' :
                           panel.priority === 'Medium' ? '#0ea5e9' : '#06b6d4',
                transition: { duration: 0.3 }
              }}
            >
              {/* Animated gradient background on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 bg-gradient-to-r from-[#eff6ff] via-[#f0f9ff] to-[#ecfeff]"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-start gap-4 flex-1">
                  {/* Panel Image */}
                  {panel.imageUrl ? (
                    <motion.div
                      className="w-24 h-24 rounded-lg overflow-hidden shadow-lg flex-shrink-0"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05, type: "spring", stiffness: 200, damping: 15 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <img
                        src={panel.imageUrl}
                        alt={`Panel ${panel.id}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      className={`w-14 h-14 rounded-full flex items-center justify-center ${
                        panel.priority === 'High' ? 'bg-gradient-to-br from-[#dbeafe] to-[#bfdbfe]' :
                        panel.priority === 'Medium' ? 'bg-gradient-to-br from-[#e0f2fe] to-[#bae6fd]' :
                        'bg-gradient-to-br from-[#cffafe] to-[#a5f3fc]'
                      } shadow-lg`}
                      initial={{ rotate: -180, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ delay: index * 0.05, type: "spring", stiffness: 200, damping: 15 }}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                    >
                      <AlertCircle className={`w-7 h-7 ${
                        panel.priority === 'High' ? 'text-[#1d4ed8]' :
                        panel.priority === 'Medium' ? 'text-[#0369a1]' : 'text-[#0e7490]'
                      }`} />
                    </motion.div>
                  )}

                  {/* Panel Info */}
                  <div className="flex-1">
                    <motion.h3
                      className="text-lg font-semibold text-[var(--solar-navy)] mb-1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      Panel #{panel.id}
                    </motion.h3>
                    <motion.p
                      className="text-sm text-[var(--solar-text-muted)] mb-4"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.15 }}
                    >
                      Action Required
                    </motion.p>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-4 gap-6">
                      {/* Severity */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 + 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="flex items-center gap-2 text-sm text-[var(--solar-text-muted)] mb-1">
                          <AlertCircle className="w-4 h-4 text-[#6366f1]" />
                          <span>Severity</span>
                        </div>
                        <motion.div
                          className="text-2xl font-bold text-[#4f46e5]"
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.05 + 0.2, type: "spring", stiffness: 200 }}
                        >
                          {panel.severity}%
                        </motion.div>
                      </motion.div>

                      {/* Energy Loss */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 + 0.15 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="flex items-center gap-2 text-sm text-[var(--solar-text-muted)] mb-1">
                          <Zap className="w-4 h-4 text-[#3b82f6]" />
                          <span>Energy Loss</span>
                        </div>
                        <motion.div
                          className="text-2xl font-bold text-[#2563eb]"
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.05 + 0.25, type: "spring", stiffness: 200 }}
                        >
                          {panel.kwhLoss.toFixed(2)} kWh/day
                        </motion.div>
                      </motion.div>

                      {/* Cost Loss */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 + 0.2 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="flex items-center gap-2 text-sm text-[var(--solar-text-muted)] mb-1">
                          <DollarSign className="w-4 h-4 text-[#0ea5e9]" />
                          <span>Cost Loss</span>
                        </div>
                        <motion.div
                          className="text-2xl font-bold text-[#0284c7]"
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.05 + 0.3, type: "spring", stiffness: 200 }}
                        >
                          {panel.sarLoss.toFixed(2)} SAR/day
                        </motion.div>
                      </motion.div>

                      {/* Next Maintenance */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 + 0.25 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="flex items-center gap-2 text-sm text-[var(--solar-text-muted)] mb-1">
                          <Calendar className="w-4 h-4 text-[#06b6d4]" />
                          <span>Next Maintenance</span>
                        </div>
                        <motion.div
                          className="text-lg font-semibold text-[#0891b2]"
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.05 + 0.35, type: "spring", stiffness: 200 }}
                        >
                          {getNextMaintenanceDate(panel)}
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Recommended Action */}
                    <motion.div
                      className="mt-4 p-3 bg-gradient-to-r from-[#eff6ff] to-sky-50 rounded-lg border border-blue-100"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 + 0.4 }}
                      whileHover={{ scale: 1.02, backgroundColor: '#eff6ff' }}
                    >
                      <div className="text-sm text-[var(--solar-text)]">
                        <span className="font-semibold text-[#1d4ed8]">Recommended Action:</span>{' '}
                        <span className="text-[var(--solar-navy)]">{getRecommendedAction(panel)}</span>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Priority Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.05 + 0.2, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <PriorityBadge priority={panel.priority as Priority} size="md" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPanels.length === 0 && (
          <motion.div
            className="text-center py-20 text-[var(--solar-text-muted)]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <AlertCircle className="w-16 h-16 mx-auto mb-4 text-[#93c5fd]" />
            </motion.div>
            <p className="text-lg">No panels found matching your filters</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
