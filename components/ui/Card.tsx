// Placeholder for shadcn/ui Card component.
// Replace with actual shadcn/ui Card implementation when integrating UI library.

import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * Card component (shadcn/ui placeholder)
 * Replace with shadcn/ui Card when available.
 */
export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  ...props
}) => (
  <div className={`bg-white rounded-xl shadow-lg p-8 ${className}`} {...props}>
    {children}
  </div>
);

export default Card;
