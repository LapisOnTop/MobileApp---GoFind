import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
}

const PhoneFrame = ({ children }: PhoneFrameProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="phone-frame bg-background flex flex-col">
        <div className="phone-notch" />
        {children}
      </div>
    </div>
  );
};

export default PhoneFrame;
