quillinsight/components/ui/Input.tsx
// Placeholder for shadcn/ui Input component.
// Replace with actual shadcn/ui Input implementation when integrating UI library.

import React from "react";

/**
 * Input component (shadcn/ui placeholder)
 * Replace with shadcn/ui Input when available.
 */
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ ...props }, ref) => (
    <input
      ref={ref}
      className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
      {...props}
    />
  )
);

Input.displayName = "Input";
