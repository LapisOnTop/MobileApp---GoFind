import { Search, LogOut } from "lucide-react";

interface HeaderBarProps {
  onLookup: () => void;
  isSearching: boolean;
  onSignOut?: () => void;
}

const HeaderBar = ({ onLookup, isSearching, onSignOut }: HeaderBarProps) => {
  return (
    <div className="flex items-center justify-between px-5 pt-10 pb-3 bg-background border-b border-border">
      <div className="flex items-center gap-2">
        {onSignOut && (
          <button
            onClick={onSignOut}
            className="p-1.5 rounded-lg bg-secondary text-muted-foreground active:bg-border"
          >
            <LogOut size={14} />
          </button>
        )}
        <h1 className="text-base font-semibold text-foreground tracking-tight">Design Studio</h1>
      </div>
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
