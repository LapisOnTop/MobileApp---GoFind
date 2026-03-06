import { Search } from "lucide-react";

interface HeaderBarProps {
  onLookup: () => void;
  isSearching: boolean;
}

const HeaderBar = ({ onLookup, isSearching }: HeaderBarProps) => {
  return (
    <div className="flex items-center justify-between px-5 pt-10 pb-3 bg-background border-b border-border">
      <h1 className="text-base font-semibold text-foreground tracking-tight">Design Studio</h1>
      <button
        onClick={onLookup}
        disabled={isSearching}
        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium transition-all active:scale-95 disabled:opacity-50"
      >
        <Search size={15} />
        Lookup
      </button>
    </div>
  );
};

export default HeaderBar;
