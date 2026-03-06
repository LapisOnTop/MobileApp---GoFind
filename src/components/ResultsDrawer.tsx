import { X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface ProductResult {
  title: string;
  price: string;
  source: string;
  thumbnail: string;
  link: string;
}

type CategoryKey = "Global General Marketplaces" | "Regional Powerhouses" | "Specialized & Niche Stores" | "Social & Local Commerce";
type CategorizedResults = Record<CategoryKey, ProductResult[]>;

interface ResultsDrawerProps {
  open: boolean;
  onClose: () => void;
  results: CategorizedResults | null;
}

const ResultsDrawer = ({ open, onClose, results }: ResultsDrawerProps) => {
  const categories = results ? (Object.keys(results) as CategoryKey[]) : [];
  const totalResults = results ? categories.reduce((sum, cat) => sum + results[cat].length, 0) : 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="absolute bottom-0 left-0 right-0 z-50 bg-card rounded-t-2xl border-t border-border"
          style={{ maxHeight: "85%" }}
        >
          {/* Handle */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-card sticky top-0 z-10 rounded-t-2xl">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Sourcing Matches</h2>
              <p className="text-xs text-muted-foreground">{totalResults} results found globally</p>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-colors">
              <X size={16} />
            </button>
          </div>

          {/* Results grouped by category */}
          <div className="overflow-y-auto p-4 space-y-6" style={{ maxHeight: "calc(85vh - 60px)" }}>
            {categories.map((category) => (
              <div key={category} className="space-y-3">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">
                  {category}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {results![category].map((product, i) => (
                    <div key={i} className="bg-secondary/50 rounded-xl overflow-hidden flex flex-col border border-border hover:border-primary/50 transition-colors group">
                      <div className="aspect-square bg-surface-elevated flex items-center justify-center overflow-hidden relative">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                      </div>
                      <div className="p-3 flex flex-col gap-1.5 flex-1">
                        <p className="text-xs font-semibold text-foreground line-clamp-2 leading-snug">{product.title}</p>
                        <p className="text-[10px] font-medium text-muted-foreground bg-background/50 rounded px-1.5 py-0.5 w-max">{product.source}</p>
                        <p className="text-sm font-bold text-primary mt-auto pt-1">{product.price}</p>
                        <a
                          href={product.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary text-primary-foreground text-[10px] font-bold active:scale-[0.98] transition-all shadow-sm shadow-primary/20 hover:bg-primary/90"
                        >
                          Source Now <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  ))}
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
