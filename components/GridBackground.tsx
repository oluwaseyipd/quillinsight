"use client";

const GridBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
      }}
    />
    <div
      className="absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(59, 130, 246, 0.8) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.8) 1px, transparent 1px)
        `,
        backgroundSize: "200px 200px",
      }}
    />
  </div>
);

export default GridBackground;
