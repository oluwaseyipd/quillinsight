import React from "react";

interface DividerProps {
  text?: string;
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({ text, className = "" }) => (
  <div className={`flex items-center w-full my-4 ${className}`}>
    <div className="flex-grow h-px bg-muted-foreground/20" />
    {text && (
      <span className="mx-4 text-sm text-muted-foreground whitespace-nowrap select-none">
        {text}
      </span>
    )}
    <div className="flex-grow h-px bg-muted-foreground/20" />
  </div>
);

export default Divider;
