import {
  Upload, Trash2, Crown, Copy, SquareArrowUp, SquareArrowDown,
  AlignCenter, Droplet, Eraser, FlipHorizontal, FlipVertical,
  RotateCw, Maximize, LayoutTemplate, Grid, Grid3X3, Shirt, Frame
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { fabric } from "fabric";
import { toast } from "sonner";

interface BottomToolbarProps {
  canvasRef: React.MutableRefObject<fabric.Canvas | null>;
  controls: {
    layoutMode: boolean;
    setLayoutMode: React.Dispatch<React.SetStateAction<boolean>>;
    showPrintArea: boolean;
    setShowPrintArea: React.Dispatch<React.SetStateAction<boolean>>;
    showGrid: boolean;
    setShowGrid: React.Dispatch<React.SetStateAction<boolean>>;
    snapToGrid: boolean;
    setSnapToGrid: React.Dispatch<React.SetStateAction<boolean>>;
    activeView: "front" | "back";
    setActiveView: React.Dispatch<React.SetStateAction<"front" | "back">>;
  };
  onSubscribe: () => void;
}

const BottomToolbar = ({ canvasRef, controls, onSubscribe }: BottomToolbarProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hasSelection, setHasSelection] = useState(false);
  const [opacity, setOpacity] = useState<number>(1);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSelection = () => {
      const activeObj = canvas.getActiveObject();
      const hasValidSelection = !!activeObj && activeObj.name !== "printArea" && !activeObj.name?.startsWith("gridLine");
      setHasSelection(hasValidSelection);
      if (hasValidSelection && activeObj) {
        setOpacity(activeObj.opacity || 1);
      }
    };

    canvas.on("selection:created", updateSelection);
    canvas.on("selection:updated", updateSelection);
    canvas.on("selection:cleared", updateSelection);

    return () => {
      canvas.off("selection:created", updateSelection);
      canvas.off("selection:updated", updateSelection);
      canvas.off("selection:cleared", updateSelection);
    };
  }, [canvasRef.current]);

  const handleUpload = () => fileInputRef.current?.click();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !canvasRef.current) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      fabric.Image.fromURL(dataUrl, (img) => {
        const maxLogoWidth = 100;
        const maxLogoHeight = 100;
        const scale = Math.min(maxLogoWidth / (img.width || maxLogoWidth), maxLogoHeight / (img.height || maxLogoHeight));
        img.scale(scale);
        img.set({
          left: 358 / 2,
          top: 440 / 2 - 20,
          originX: "center",
          originY: "center",
          cornerColor: "#000",
          cornerStrokeColor: "#fff",
          borderColor: "#000",
          cornerSize: 10,
          transparentCorners: false,
          name: "designLogo",
        });
        canvasRef.current?.add(img);
        canvasRef.current?.setActiveObject(img);
        canvasRef.current?.renderAll();
      });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const objects = canvas.getObjects();
    objects.forEach((obj) => {
      if (obj.name !== "printArea" && !obj.name?.startsWith("gridLine")) canvas.remove(obj);
    });
    canvas.discardActiveObject();
    canvas.renderAll();
  };

  const activeOp = (fn: (obj: fabric.Object, canvas: fabric.Canvas) => void) => () => {
    const canvas = canvasRef.current;
    const obj = canvas?.getActiveObject();
    if (canvas && obj) fn(obj, canvas);
  };

  const alignCenter = activeOp((obj, canvas) => {
    obj.set({ left: 358 / 2, top: 440 / 2 - 20 });
    obj.setCoords();
    canvas.renderAll();
  });

  const duplicate = activeOp((obj, canvas) => {
    obj.clone((cloned: fabric.Object) => {
      cloned.set({ left: (obj.left || 0) + 20, top: (obj.top || 0) + 20, name: "designLogo" });
      canvas.add(cloned);
      canvas.setActiveObject(cloned);
      canvas.renderAll();
    });
  });

  const bringForward = activeOp((obj, canvas) => { canvas.bringForward(obj); canvas.renderAll(); });
  const sendBackwards = activeOp((obj, canvas) => { canvas.sendBackwards(obj); canvas.renderAll(); });
  const deleteObj = activeOp((obj, canvas) => { canvas.remove(obj); canvas.discardActiveObject(); canvas.renderAll(); });

  const flipH = activeOp((obj, canvas) => { obj.set('flipX', !obj.flipX); canvas.renderAll(); });
  const flipV = activeOp((obj, canvas) => { obj.set('flipY', !obj.flipY); canvas.renderAll(); });
  const rotateCw = activeOp((obj, canvas) => { obj.rotate((obj.angle || 0) + 45); canvas.renderAll(); });

  const scaleUp = activeOp((obj, canvas) => { obj.scale((obj.scaleX || 1) * 1.1); canvas.renderAll(); });

  const changeOpacity = activeOp((obj, canvas) => {
    const newOpacity = opacity === 1 ? 0.5 : opacity === 0.5 ? 0.2 : 1;
    obj.set({ opacity: newOpacity });
    setOpacity(newOpacity);
    canvas.renderAll();
  });

  const removeBg = activeOp((obj, canvas) => {
    const isAlreadyMultiply = obj.globalCompositeOperation === 'multiply';
    obj.set({ globalCompositeOperation: isAlreadyMultiply ? 'source-over' : 'multiply' });
    canvas.renderAll();
    toast.success(isAlreadyMultiply ? "Restored background" : "Magic Background Removed!");
  });

  return (
    <div className="flex flex-col bg-background border-t border-border">

      {/* GLOBAL SETTINGS ROW */}
      <div className="flex items-center gap-4 px-4 py-2 overflow-x-auto border-b border-border/50 hide-scrollbar scroll-smooth bg-secondary/30">
        <button onClick={() => controls.setActiveView(v => v === "front" ? "back" : "front")} className="flex flex-col items-center gap-1 shrink-0 text-muted-foreground hover:text-foreground">
          <Shirt size={16} className={controls.activeView === "back" ? "text-primary" : ""} />
          <span className="text-[10px]">{controls.activeView === "front" ? "Front View" : "Back View"}</span>
        </button>
        <div className="w-px h-6 bg-border mx-1 shrink-0" />
        <button onClick={() => controls.setLayoutMode(!controls.layoutMode)} className={`flex flex-col items-center gap-1 shrink-0 ${controls.layoutMode ? "text-primary" : "text-muted-foreground"}`}>
          <LayoutTemplate size={16} />
          <span className="text-[10px]">Clamp</span>
        </button>
        <button onClick={() => controls.setShowPrintArea(!controls.showPrintArea)} className={`flex flex-col items-center gap-1 shrink-0 ${controls.showPrintArea ? "text-primary" : "text-muted-foreground"}`}>
          <Frame size={16} />
          <span className="text-[10px]">Print Box</span>
        </button>
        <button onClick={() => controls.setShowGrid(!controls.showGrid)} className={`flex flex-col items-center gap-1 shrink-0 ${controls.showGrid ? "text-primary" : "text-muted-foreground"}`}>
          <Grid size={16} />
          <span className="text-[10px]">Grid</span>
        </button>
        <button onClick={() => controls.setSnapToGrid(!controls.snapToGrid)} className={`flex flex-col items-center gap-1 shrink-0 ${controls.snapToGrid ? "text-primary" : "text-muted-foreground"}`}>
          <Grid3X3 size={16} />
          <span className="text-[10px]">Snap</span>
        </button>
      </div>

      {hasSelection && (
        <div className="flex items-center gap-4 px-4 py-2 overflow-x-auto border-b border-border/50 hide-scrollbar scroll-smooth">
          <button onClick={deleteObj} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-destructive shrink-0">
            <Trash2 size={16} />
            <span className="text-[10px]">Delete</span>
          </button>
          <button onClick={duplicate} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground shrink-0">
            <Copy size={16} />
            <span className="text-[10px]">Duplicate</span>
          </button>
          <button onClick={alignCenter} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground shrink-0">
            <AlignCenter size={16} />
            <span className="text-[10px]">Center</span>
          </button>
          <button onClick={flipH} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground shrink-0">
            <FlipHorizontal size={16} />
            <span className="text-[10px]">Flip H</span>
          </button>
          <button onClick={flipV} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground shrink-0">
            <FlipVertical size={16} />
            <span className="text-[10px]">Flip V</span>
          </button>
          <button onClick={rotateCw} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground shrink-0">
            <RotateCw size={16} />
            <span className="text-[10px]">Rotate</span>
          </button>
          <button onClick={scaleUp} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground shrink-0">
            <Maximize size={16} />
            <span className="text-[10px]">Scale</span>
          </button>
          <button onClick={bringForward} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground shrink-0">
            <SquareArrowUp size={16} />
            <span className="text-[10px]">Forward</span>
          </button>
          <button onClick={sendBackwards} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground shrink-0">
            <SquareArrowDown size={16} />
            <span className="text-[10px]">Backward</span>
          </button>
          <button onClick={changeOpacity} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground shrink-0">
            <Droplet size={16} className={opacity < 1 ? "fill-current text-primary" : ""} />
            <span className="text-[10px]">Opacity</span>
          </button>
          <button onClick={removeBg} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground shrink-0">
            <Eraser size={16} className="text-primary" />
            <span className="text-[10px] text-primary">Remove BG</span>
          </button>
        </div>
      )}

      <div className="flex items-center justify-around px-4 py-3">
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
          <span className="text-[10px] font-medium">Add Logo</span>
        </button>
        <button
          onClick={clearCanvas}
          className="flex flex-col items-center gap-1 text-muted-foreground transition-colors active:text-destructive"
        >
          <Trash2 size={20} />
          <span className="text-[10px] font-medium">Clear {controls.activeView}</span>
        </button>
        <button
          onClick={onSubscribe}
          className="flex flex-col items-center gap-1 text-primary transition-colors active:text-primary/80"
        >
          <Crown size={20} />
          <span className="text-[10px] font-medium">Pro</span>
        </button>
      </div>
    </div>
  );
};

export default BottomToolbar;
