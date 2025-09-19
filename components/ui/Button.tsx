quillinsight/components/ui/Button.tsx
// Placeholder for shadcn/ui Button component.
// Replace with actual shadcn/ui implementation when integrating UI library.

import React from "react";

/**
 * Button component from shadcn/ui.
 * Replace this placeholder with the actual shadcn/ui Button when ready.
 */
export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => (
  <button
    className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/80 transition"
    {...props}
  >
    {children}
  </button>
);

export default Button;
