import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/Button';
import { Alert } from '../components/Alert';
import { Upload, FileJson, Image as ImageIcon, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type UploadState = 'idle' | 'uploading' | 'processing' | 'success' | 'error';

export function UploadPage() {
  const [uploadState, setUploadState] = useState<UploadState>('idle');
  const [dragActive, setDragActive] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [fileCount, setFileCount] = useState<number>(0);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    // Validate exactly 2 files
    if (files.length !== 2) {
      setUploadState('error');
      return;
    }
    
    const names = Array.from(files).map(f => f.name);
    setFileNames(names);
    setFileCount(files.length);
    setUploadState('uploading');
    
    // Simulate upload
    setTimeout(() => {
      setUploadState('processing');
      
      // Simulate processing
      setTimeout(() => {
        setUploadState('success');
      }, 2000);
    }, 1500);
  };

  const reset = () => {
    setUploadState('idle');
    setFileNames([]);
    setFileCount(0);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eff6ff] via-[#f0f9ff] to-[#ecfeff]">
      <Navbar />

      <div className="max-w-[1440px] mx-auto px-6 py-8">
        <motion.h1
          className="text-3xl font-semibold text-[var(--solar-navy)] mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Upload Inspection Data
        </motion.h1>
        <motion.p
          className="text-[var(--solar-text-muted)] mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Upload thermal and RGB images, or load demonstration data to analyze solar panel defects
        </motion.p>
        
        {/* Upload Zone */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-3 border-dashed rounded-2xl p-12 text-center transition-all backdrop-blur-sm ${
              dragActive
                ? 'border-[#3b82f6] bg-[#dbeafe] scale-105 shadow-2xl shadow-[#93c5fd]/50'
                : 'border-[#93c5fd] bg-white/80'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ borderColor: '#3b82f6', scale: 1.01 }}
          >
            <AnimatePresence mode="wait">
              {uploadState === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="inline-block p-6 rounded-full bg-gradient-to-br from-[#dbeafe] to-[#e0f2fe] mb-4"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Upload className="w-16 h-16 text-[#2563eb] mx-auto" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-[var(--solar-navy)] mb-2">
                    Drag and drop files here
                  </h3>
                  <p className="text-[var(--solar-text-muted)] mb-6">
                    or click to browse
                  </p>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileInput}
                    accept=".jpg,.jpeg,.png,.tif,.tiff,.json"
                    multiple
                  />
                  <label htmlFor="file-upload">
                    <motion.span
                      className="inline-block px-8 py-4 bg-gradient-to-r from-[#2563eb] via-[#0284c7] to-[#0891b2] text-white rounded-xl cursor-pointer shadow-lg hover:shadow-xl transition-all font-semibold"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Browse Files
                    </motion.span>
                  </label>
                  <div className="mt-8 flex gap-8 justify-center text-sm">
                    <motion.div
                      className="flex items-center gap-2 px-4 py-2 bg-[#eff6ff] rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <ImageIcon className="w-4 h-4 text-[#2563eb]" />
                      <span className="text-[#1d4ed8] font-medium">RGB Images</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-2 px-4 py-2 bg-[#f0f9ff] rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <ImageIcon className="w-4 h-4 text-[#0284c7]" />
                      <span className="text-[#0369a1] font-medium">Thermal Images</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-2 px-4 py-2 bg-[#ecfeff] rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <FileJson className="w-4 h-4 text-[#0891b2]" />
                      <span className="text-[#0e7490] font-medium">JSON Data</span>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {uploadState === 'uploading' && (
                <motion.div
                  key="uploading"
                  className="py-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="inline-block p-4 rounded-full bg-gradient-to-br from-[#dbeafe] to-[#e0f2fe] mb-4"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Loader2 className="w-16 h-16 text-[#2563eb] mx-auto animate-spin" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-[var(--solar-navy)] mb-2">
                    Uploading...
                  </h3>
                  <p className="text-[var(--solar-text-muted)] font-medium">
                    {fileCount} file{fileCount !== 1 ? 's' : ''} selected
                  </p>
                  <div className="mt-6 max-w-md mx-auto">
                    <div className="h-3 bg-[#dbeafe] rounded-full overflow-hidden shadow-inner">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#2563eb] via-[#0284c7] to-[#0891b2] rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: '66%' }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {uploadState === 'processing' && (
                <motion.div
                  key="processing"
                  className="py-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="inline-block p-4 rounded-full bg-gradient-to-br from-[#e0f2fe] to-[#cffafe] mb-4"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Loader2 className="w-16 h-16 text-[#0284c7] mx-auto animate-spin" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-[var(--solar-navy)] mb-2">
                    Processing Inspection...
                  </h3>
                  <p className="text-[var(--solar-text-muted)] mb-6">
                    Detecting defects and calculating loss estimates
                  </p>
                  <div className="max-w-md mx-auto text-left space-y-3">
                    <motion.div
                      className="flex items-center gap-3 p-3 bg-[#eff6ff] rounded-lg border border-[#bfdbfe]"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <CheckCircle className="w-5 h-5 text-[#2563eb]" />
                      <span className="font-medium text-[#1d4ed8]">Defect detection complete</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-3 p-3 bg-[#f0f9ff] rounded-lg border border-sky-200"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Loader2 className="w-5 h-5 text-[#0284c7] animate-spin" />
                      <span className="font-medium text-[#0369a1]">Calculating loss estimates...</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-3 p-3 bg-[#f8fafc] rounded-lg border border-[#e2e8f0]"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="w-5 h-5 rounded-full border-2 border-[#cbd5e1]"></div>
                      <span className="font-medium text-[#64748b]">Generating priority scores</span>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {uploadState === 'success' && (
                <motion.div
                  key="success"
                  className="py-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="inline-block p-4 rounded-full bg-gradient-to-br from-[#dbeafe] to-[#cffafe] mb-4"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                  >
                    <CheckCircle className="w-16 h-16 text-[#2563eb] mx-auto" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-[var(--solar-navy)] mb-2">
                    Processing Complete!
                  </h3>
                  <p className="text-[var(--solar-text-muted)] mb-8 font-medium">
                    {fileCount} panel{fileCount !== 1 ? 's' : ''} analyzed successfully
                  </p>
                  <motion.div
                    className="flex gap-4 justify-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button onClick={() => window.location.href = '/panels'}>
                      View Panels
                    </Button>
                    <Button variant="secondary" onClick={reset}>
                      Upload Another
                    </Button>
                  </motion.div>
                </motion.div>
              )}

              {uploadState === 'error' && (
                <motion.div
                  key="error"
                  className="py-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="inline-block p-4 rounded-full bg-gradient-to-br from-[#fee2e2] to-[#fecaca] mb-4"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  >
                    <AlertCircle className="w-16 h-16 text-[#dc2626] mx-auto" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-[#dc2626] mb-2">
                    Invalid Upload
                  </h3>
                  <p className="text-[var(--solar-text-muted)] mb-4 font-medium">
                    Please upload exactly 2 images per upload
                  </p>
                  <p className="text-sm text-[var(--solar-text-muted)] mb-8">
                    One thermal image and one normal (RGB) image are required
                  </p>
                  <Button variant="secondary" onClick={reset}>
                    Try Again
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Upload Requirements */}
          <motion.div
            className="mt-8 p-6 bg-gradient-to-r from-[#eff6ff] to-[#f0f9ff] backdrop-blur-sm rounded-2xl border-2 border-[#93c5fd] shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ borderColor: '#3b82f6', boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.3)" }}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-white shadow-md flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-[#2563eb]" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#08306b] mb-2">
                  Upload Requirements
                </h4>
                <p className="text-[#08519c] font-medium mb-3">
                  Each upload must contain exactly <span className="font-bold text-[#2563eb]">2 images</span>:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#2563eb]"></div>
                    <span className="text-sm font-medium text-[#1d4ed8]">One thermal image (infrared)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#0284c7]"></div>
                    <span className="text-sm font-medium text-[#0369a1]">One normal RGB image</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}