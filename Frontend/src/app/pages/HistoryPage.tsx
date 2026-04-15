import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { SearchInput } from '../components/SearchInput';
import { FilterDropdown } from '../components/FilterDropdown';
import { panels, Priority } from '../data/mockData';
import { motion } from 'motion/react';
import { Calendar, Wrench, AlertTriangle, Image as ImageIcon } from 'lucide-react';

export function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const getNextMaintenanceDate = (panel: typeof panels[0]) => {
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

  const filteredPanels = panels.filter(panel => {
    const matchesSearch = panel.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === 'All' || panel.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

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
          Previously uploaded panels
        </motion.h1>
        <motion.p
          className="text-[var(--solar-text-muted)] mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          View all previous panel inspections and maintenance records
        </motion.p>

        {/* Filters */}
        <motion.div
          className="flex gap-4 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            className="flex-1"
            whileHover={{ scale: 1.01 }}
          >
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by Panel ID..."
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

        {/* History Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPanels.map((panel, index) => (
            <motion.div
              key={panel.id}
              className="bg-white rounded-xl border-2 border-[var(--solar-border)] overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              whileHover={{
                scale: 1.03,
                y: -8,
                borderColor: panel.priority === 'High' ? '#2563eb' :
                           panel.priority === 'Medium' ? '#0ea5e9' : '#06b6d4',
                transition: { duration: 0.3 }
              }}
            >
              {/* Panel Image */}
              <div className="relative h-48 bg-gradient-to-br from-[#deebf7] to-[#c6dbef]">
                {panel.imageUrl ? (
                  <img
                    src={panel.imageUrl}
                    alt={`Panel ${panel.id}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-16 h-16 text-[#9ecae1]" />
                  </div>
                )}
                {/* Priority Badge Overlay */}
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
                  panel.priority === 'High' ? 'bg-[#dc2626]' :
                  panel.priority === 'Medium' ? 'bg-[#f59e0b]' :
                  'bg-[#16a34a]'
                }`}>
                  {panel.priority}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                {/* Panel ID */}
                <h3 className="text-xl font-bold text-[var(--solar-navy)] mb-4">
                  Panel #{panel.id}
                </h3>

                {/* Severity */}
                <motion.div
                  className="mb-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#2171b5]" />
                      <span className="text-sm font-medium text-[var(--solar-text-muted)]">Severity</span>
                    </div>
                    <span className="text-2xl font-bold text-[#08519c]">
                      {panel.severity}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#deebf7] rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        panel.severity >= 80 ? 'bg-[#dc2626]' :
                        panel.severity >= 60 ? 'bg-[#f59e0b]' :
                        'bg-[#16a34a]'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${panel.severity}%` }}
                      transition={{ duration: 1, delay: index * 0.05 + 0.5 }}
                    />
                  </div>
                </motion.div>

                {/* Next Maintenance */}
                <motion.div
                  className="mb-4 p-3 bg-[#f7fbff] rounded-lg border border-[#c6dbef]"
                  whileHover={{ scale: 1.02, backgroundColor: '#eff6ff' }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-[#2171b5]" />
                    <span className="text-xs font-semibold text-[var(--solar-text-muted)]">Next Maintenance</span>
                  </div>
                  <span className="text-lg font-bold text-[#08306b]">
                    {getNextMaintenanceDate(panel)}
                  </span>
                </motion.div>

                {/* Recommended Action */}
                <motion.div
                  className="p-3 bg-gradient-to-r from-[#deebf7] to-[#f7fbff] rounded-lg border border-[#c6dbef]"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Wrench className="w-4 h-4 text-[#2171b5]" />
                    <span className="text-xs font-semibold text-[var(--solar-text-muted)]">Recommended Action</span>
                  </div>
                  <p className="text-sm font-medium text-[#08519c]">
                    {getRecommendedAction(panel)}
                  </p>
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
            <ImageIcon className="w-16 h-16 mx-auto mb-4 text-[#9ecae1]" />
            <p className="text-lg">No inspection history found</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}