import { fabric } from "fabric";

export const loadRasterImage = (
  canvas: fabric.Canvas,
  dataUrl: string,
  options: Partial<fabric.ImageProps> = {}
) => {
  fabric.Image.fromURL(dataUrl, (img) => {
    if (!img) return;
    const maxLogoWidth = 100;
    const maxLogoHeight = 100;
    const scale = Math.min(
      maxLogoWidth / (img.width || maxLogoWidth),
      maxLogoHeight / (img.height || maxLogoHeight)
    );

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
      ...options,
    });

    canvas.add(img);
    canvas.setActiveObject(img);
    canvas.renderAll();
  });
};

export const loadSvgImage = (
  canvas: fabric.Canvas,
  svgText: string,
  options: Partial<fabric.ObjectProps> = {}
) => {
  fabric.loadSVGFromString(svgText, (objects, _options) => {
    const svg = fabric.util.groupSVGElements(objects, {
      left: 358 / 2,
      top: 440 / 2 - 20,
      originX: "center",
      originY: "center",
      name: "designLogo",
      ...options,
    });

    const bounds = svg.getBoundingRect();
    const maxLogoWidth = 100;
    const maxLogoHeight = 100;
    const scale = Math.min(
      maxLogoWidth / bounds.width,
      maxLogoHeight / bounds.height
    );

    svg.scale(scale);
    canvas.add(svg);
    canvas.setActiveObject(svg);
    canvas.renderAll();
  });
};

