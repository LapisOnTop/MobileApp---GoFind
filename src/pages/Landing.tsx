import { motion } from "framer-motion";
import { Search, Sparkles, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PhoneFrame from "@/components/PhoneFrame";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full bg-background">
        {/* Status bar spacer */}
        <div className="h-12" />

        {/* Hero */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center"
          >
            <Search size={28} className="text-primary-foreground" />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-foreground mb-2">Design Studio</h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Design your product, find it anywhere.
              <br />
              Visual search powered by AI.
            </p>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col gap-3 w-full"
          >
            {[
              { icon: Sparkles, label: "AI-Powered Visual Search" },
              { icon: ShoppingBag, label: "Find Real Products Instantly" },
              { icon: Search, label: "Source From Global Suppliers" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary border border-border"
              >
                <Icon size={18} className="text-primary" />
                <span className="text-xs font-medium text-foreground">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="px-6 pb-10 flex flex-col gap-3"
        >
          <button
            onClick={() => navigate("/auth?mode=signup")}
            className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold active:scale-[0.98] transition-transform"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/auth?mode=login")}
            className="w-full py-3.5 rounded-xl bg-secondary text-foreground text-sm font-medium active:scale-[0.98] transition-transform border border-border"
          >
            I already have an account
          </button>
        </motion.div>
      </div>
    </PhoneFrame>
  );
};

export default Landing;
