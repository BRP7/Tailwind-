const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Update with your file paths
  theme: {
    extend: {
      animation: {
        pulse: "pulse 2s infinite",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: 0.5 },
          "50%": { opacity: 1 },
        },
      },
      colors: {
        cyanGlass: "rgba(126, 192, 202, 0.171)", // Glass transparency
        lightGray: "#f5f5f5",
        neonBlue: "#00d4ff",
        whiteGlow: "#FCFDF8",
        grayBlue: "#787C97",
      },
      backdropBlur: {
        xs: "2px",
        sm: "10px",
        md: "20px",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".glass-border": {
          border: "2px solid rgba(255, 255, 255, 0.2)",
        },
        ".glow-shadow": {
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 255, 255, 0.5)",
        },
      });
    }),
  ],
};
