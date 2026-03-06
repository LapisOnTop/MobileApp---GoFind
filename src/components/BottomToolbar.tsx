import { Upload, Trash2, Crown } from "lucide-react";
import { useRef } from "react";
import { fabric } from "fabric";

interface BottomToolbarProps {
  canvasRef: React.MutableRefObject<fabric.Canvas | null>;
  onSubscribe: () => void;
}

const BottomToolbar = ({ canvasRef, onSubscribe }: BottomToolbarProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !canvasRef.current) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      fabric.Image.fromURL(dataUrl, (img) => {
        img.scaleToWidth(120);
        img.set({
          left: 358 / 2,
          top: 420 / 2 - 20,
          originX: "center",
          originY: "center",
        });
        canvasRef.current?.add(img);
        canvasRef.current?.setActiveObject(img);
        canvasRef.current?.renderAll();
      });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const objects = canvas.getObjects();
    // Keep the first object (t-shirt background)
    for (let i = objects.length - 1; i > 0; i--) {
      canvas.remove(objects[i]);
    }
    canvas.discardActiveObject();
    canvas.renderAll();
  };

  return (
    <div className="flex items-center justify-around px-4 py-3 bg-background border-t border-border">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
      <button
        onClick={handleUpload}
        className="flex flex-col items-center gap-1 text-muted-foreground transition-colors active:text-primary"
      >
        <Upload size={20} />
        <span className="text-[10px] font-medium">Upload</span>
      </button>
      <button
        onClick={handleClear}
        className="flex flex-col items-center gap-1 text-muted-foreground transition-colors active:text-destructive"
      >
        <Trash2 size={20} />
        <span className="text-[10px] font-medium">Clear</span>
      </button>
      <button
        onClick={onSubscribe}
        className="flex flex-col items-center gap-1 text-primary transition-colors active:text-primary/80"
      >
        <Crown size={20} />
        <span className="text-[10px] font-medium">Pro</span>
      </button>
    </div>
  );
};

export default BottomToolbar;
