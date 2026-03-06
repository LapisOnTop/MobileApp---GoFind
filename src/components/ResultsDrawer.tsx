import { X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface ProductResult {
  title: string;
  price: string;
  source: string;
  thumbnail: string;
  link: string;
}

interface ResultsDrawerProps {
  open: boolean;
  onClose: () => void;
  results: ProductResult[];
}

const ResultsDrawer = ({ open, onClose, results }: ResultsDrawerProps) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="absolute bottom-0 left-0 right-0 z-50 bg-card rounded-t-2xl border-t border-border"
          style={{ maxHeight: "75%" }}
        >
          {/* Handle */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-border">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Product Matches</h2>
              <p className="text-xs text-muted-foreground">{results.length} results found</p>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg bg-secondary text-muted-foreground active:bg-border">
              <X size={16} />
            </button>
          </div>

          {/* Results grid */}
          <div className="overflow-y-auto p-4 grid grid-cols-2 gap-3" style={{ maxHeight: "calc(75vh - 60px)" }}>
            {results.map((product, i) => (
              <div key={i} className="bg-secondary rounded-xl overflow-hidden flex flex-col">
                <div className="aspect-square bg-surface-elevated flex items-center justify-center overflow-hidden">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                </div>
                <div className="p-2.5 flex flex-col gap-1 flex-1">
                  <p className="text-xs font-medium text-foreground line-clamp-2 leading-tight">{product.title}</p>
                  <p className="text-[10px] text-muted-foreground">{product.source}</p>
                  <p className="text-sm font-semibold text-primary mt-auto">{product.price}</p>
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 flex items-center justify-center gap-1 py-1.5 rounded-md bg-primary text-primary-foreground text-[10px] font-medium active:opacity-80 transition-opacity"
                  >
                    Source Now <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResultsDrawer;
