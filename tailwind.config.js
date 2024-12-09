module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        lightGray: "#f5f5f5",
        neonBlue: "#00d4ff",
        whiteGlow : "#FCFDF8",
        grayBlue : "#787C97",
        // neonBlue: '#66fcf1',
        // darkGray: '#1f2833',
        // lightGray: '#c5c6c7',
        // pureWhite: '#ffffff',
      },
      boxShadow: {
        glow: "0 0 15px rgba(0, 212, 255, 0.8)",
      },
    },
  },
  plugins: [],
};
