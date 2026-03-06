import { motion } from "framer-motion";

const ScanOverlay = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-40 flex flex-col items-center justify-center"
      style={{ background: "rgba(10, 10, 10, 0.85)" }}
    >
      {/* Scan line */}
      <div className="absolute left-6 right-6 h-0.5 bg-primary rounded-full scan-line shadow-[0_0_12px_hsl(217_91%_60%)]" />

      <div className="flex flex-col items-center gap-3 mt-8">
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center"
        >
          <div className="w-5 h-5 rounded-full bg-primary" />
        </motion.div>
        <p className="text-sm font-medium text-foreground">Scanning design...</p>
        <p className="text-xs text-muted-foreground">Finding matching products</p>
      </div>
    </motion.div>
  );
};

export default ScanOverlay;
