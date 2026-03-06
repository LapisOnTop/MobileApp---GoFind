import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const SCAN_STEPS = [
  "Uploading design...",
  "Scanning template...",
  "Searching global suppliers...",
  "Matching exact products...",
  "Finalizing results..."
];

const ScanOverlay = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => Math.min(prev + 1, SCAN_STEPS.length - 1));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-40 flex flex-col items-center justify-center backdrop-blur-sm"
      style={{ background: "rgba(10, 10, 10, 0.85)" }}
    >
      {/* Scan line */}
      <div className="absolute left-6 right-6 h-0.5 bg-primary rounded-full scan-line shadow-[0_0_12px_hsl(var(--primary))]" />

      <div className="flex flex-col items-center gap-4 mt-8">
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 90, 180, 270, 360] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-12 h-12 rounded-full border border-dashed border-primary flex items-center justify-center p-1"
        >
          <div className="w-full h-full rounded-full bg-primary/20 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-primary" />
          </div>
        </motion.div>

        <div className="h-6 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={step}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="text-sm font-semibold text-foreground tracking-wide"
            >
              {SCAN_STEPS[step]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default ScanOverlay;
