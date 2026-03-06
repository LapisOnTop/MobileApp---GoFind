import * as React from "react";
import { Slider } from "@/components/ui/slider";

interface StyledSliderProps {
  value: number[];
  min?: number;
  max?: number;
  step?: number;
  onValueChange: (value: number[]) => void;
}

export const StyledSlider: React.FC<StyledSliderProps> = ({
  value,
  min = 0,
  max = 1,
  step = 0.1,
  onValueChange,
}) => {
  return (
    <Slider
      value={value}
      min={min}
      max={max}
      step={step}
      onValueChange={onValueChange}
      className="w-20 h-5 cursor-pointer [&>[data-orientation=horizontal]]:h-1 [&>[data-orientation=horizontal]]:bg-muted/60"
    />
  );
};

