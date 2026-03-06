import { useEffect, useRef, useCallback } from "react";
import { fabric } from "fabric";
import tshirtImg from "@/assets/tshirt.png";

interface CanvasEditorProps {
  canvasRef: React.MutableRefObject<fabric.Canvas | null>;
}

const CanvasEditor = ({ canvasRef }: CanvasEditorProps) => {
  const canvasElRef = useRef<HTMLCanvasElement>(null);

  const initCanvas = useCallback(() => {
    if (!canvasElRef.current) return;

    const canvas = new fabric.Canvas(canvasElRef.current, {
      width: 358,
      height: 420,
      backgroundColor: "#ffffff",
      selection: true,
    });

    fabric.Image.fromURL(tshirtImg, (img) => {
      img.scaleToWidth(300);
      img.set({
        left: 358 / 2,
        top: 420 / 2,
        originX: "center",
        originY: "center",
        selectable: false,
        evented: false,
        hoverCursor: "default",
      });
      canvas.add(img);
      canvas.sendToBack(img);
      canvas.renderAll();
    });

    canvasRef.current = canvas;

    return () => {
      canvas.dispose();
    };
  }, [canvasRef]);

  useEffect(() => {
    const cleanup = initCanvas();
    return cleanup;
  }, [initCanvas]);

  return (
    <div className="flex-1 flex items-center justify-center bg-surface overflow-hidden">
      <canvas ref={canvasElRef} />
    </div>
  );
};

export default CanvasEditor;
