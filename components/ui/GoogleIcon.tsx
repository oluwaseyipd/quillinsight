import React from "react";

export const GoogleIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  width = 20,
  height = 20,
  ...props
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <g>
      <path
        d="M19.6 10.23c0-.68-.06-1.36-.18-2H10v3.79h5.41a4.63 4.63 0 0 1-2.01 3.04v2.52h3.25c1.9-1.75 2.95-4.33 2.95-7.35z"
        fill="#4285F4"
      />
      <path
        d="M10 20c2.7 0 4.97-.89 6.63-2.41l-3.25-2.52c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.59-4.13H1.06v2.59A10 10 0 0 0 10 20z"
        fill="#34A853"
      />
      <path
        d="M4.41 12.9A5.99 5.99 0 0 1 3.64 10c0-.99.18-1.95.5-2.9V4.51H1.06A10 10 0 0 0 0 10c0 1.64.39 3.19 1.06 4.59l3.35-2.69z"
        fill="#FBBC05"
      />
      <path
        d="M10 3.96c1.47 0 2.78.51 3.81 1.51l2.85-2.85C14.97.89 12.7 0 10 0A10 10 0 0 0 1.06 4.51l3.35 2.59C5.2 5.72 7.4 3.96 10 3.96z"
        fill="#EA4335"
      />
    </g>
  </svg>
);

export default GoogleIcon;
