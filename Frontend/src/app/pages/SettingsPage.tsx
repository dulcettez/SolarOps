import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/Button';
import { Alert } from '../components/Alert';
import { motion } from 'motion/react';

export function SettingsPage() {
  const [panelPower, setPanelPower] = useState('350');
  const [sunHours, setSunHours] = useState('5.5');
  const [tariff, setTariff] = useState('0.50');
  const [crewCapacity, setCrewCapacity] = useState('20');
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!panelPower || !sunHours || !tariff || !crewCapacity) {
      setAlert({ type: 'error', message: 'All fields are required' });
      return;
    }
    
    if (parseFloat(panelPower) <= 0 || parseFloat(sunHours) <= 0 || 
        parseFloat(tariff) <= 0 || parseInt(crewCapacity) <= 0) {
      setAlert({ type: 'error', message: 'All values must be greater than zero' });
      return;
    }
    
    // Simulate save
    setAlert({ type: 'success', message: 'Settings saved successfully' });
    
    // Clear alert after 3 seconds
    setTimeout(() => setAlert(null), 3000);
  };
  
  return (
    <div className="min-h-screen bg-[var(--solar-bg)]">
      <Navbar />
      
      <div className="max-w-[1440px] mx-auto px-6 py-8">
        <h1 className="text-3xl font-semibold text-[var(--solar-navy)] mb-2">Settings</h1>
        <p className="text-[var(--solar-text-muted)] mb-8">
          Configure system parameters for accurate loss estimation and maintenance planning
        </p>
        
        <div className="max-w-2xl">
          {alert && (
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Alert
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert(null)}
              />
            </motion.div>
          )}

          <motion.div
            className="bg-white rounded-lg border border-[var(--solar-border)] shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-6 border-b border-[var(--solar-border)]">
              <h3 className="font-semibold text-[var(--solar-navy)]">System Configuration</h3>
              <p className="text-sm text-[var(--solar-text-muted)] mt-1">
                These parameters are used to calculate energy and financial losses
              </p>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-6">
              {/* Panel Rated Power */}
              <div>
                <label className="block font-medium text-[var(--solar-navy)] mb-2">
                  Panel Rated Power (W)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={panelPower}
                  onChange={(e) => setPanelPower(e.target.value)}
                  className="w-full px-4 py-2 border border-[var(--solar-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--solar-navy)] focus:border-transparent"
                  placeholder="e.g., 350"
                />
                <p className="text-sm text-[var(--solar-text-muted)] mt-1">
                  Nominal power output of each solar panel under standard test conditions
                </p>
              </div>
              
              {/* Average Sun Hours */}
              <div>
                <label className="block font-medium text-[var(--solar-navy)] mb-2">
                  Average Sun Hours (hours/day)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={sunHours}
                  onChange={(e) => setSunHours(e.target.value)}
                  className="w-full px-4 py-2 border border-[var(--solar-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--solar-navy)] focus:border-transparent"
                  placeholder="e.g., 5.5"
                />
                <p className="text-sm text-[var(--solar-text-muted)] mt-1">
                  Average peak sun hours per day for your location
                </p>
              </div>
              
              {/* Electricity Tariff */}
              <div>
                <label className="block font-medium text-[var(--solar-navy)] mb-2">
                  Electricity Tariff (SAR/kWh)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={tariff}
                  onChange={(e) => setTariff(e.target.value)}
                  className="w-full px-4 py-2 border border-[var(--solar-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--solar-navy)] focus:border-transparent"
                  placeholder="e.g., 0.50"
                />
                <p className="text-sm text-[var(--solar-text-muted)] mt-1">
                  Local electricity rate used to calculate financial losses
                </p>
              </div>
              
              {/* Weekly Crew Capacity */}
              <div>
                <label className="block font-medium text-[var(--solar-navy)] mb-2">
                  Weekly Crew Capacity (panels/week)
                </label>
                <input
                  type="number"
                  value={crewCapacity}
                  onChange={(e) => setCrewCapacity(e.target.value)}
                  className="w-full px-4 py-2 border border-[var(--solar-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--solar-navy)] focus:border-transparent"
                  placeholder="e.g., 20"
                />
                <p className="text-sm text-[var(--solar-text-muted)] mt-1">
                  Maximum number of panels your maintenance crew can service per week
                </p>
              </div>
              
              <div className="pt-4 border-t border-[var(--solar-border)]">
                <Button type="submit">
                  Save Settings
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
