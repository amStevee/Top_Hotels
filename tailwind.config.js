/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        desktop_bg: "url('/src/assets/desktop_background.png')",
        mobile_bg: "url('/src/assets/mobile_background.png')",
      },
      backgroundColor: {
        navbar: "#45858c",
      },
      colors: {
        icon: "#D9C589",
      },
    },
  },
  plugins: [],
};
