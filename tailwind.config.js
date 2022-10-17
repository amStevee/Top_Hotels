/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        desktop_bg: "url('/public/assets/desktop_background.png')",
        mobile_bg: "url('/public/assets/mobile_background.png')",
        mobile_ads: "url('/public/assets/mobile_ads.png')",
        desktop_ads: "url('/public/assets/desktop_ads.png')",
        desktop_logo: "url('/public/assets/desktop_logo.png')",
        mobile_logo: "url('/public/assets/mobile_logo.png')",
      },
      backgroundColor: {
        navbar: "#45858c",
      },
      colors: {
        icon: "#D9C589",
        navbar: "#45858c",
        offwhite: "#f2f2f2",
        dark_bg: "#1e3233",
        dark_secondary_white: "#E5DED8",
        alt_dark_bg: "#2d3621",
        list_grad_1: "#48858C",
        list_grad_2: "#4D99A1",
        list_btn: "#E5DED8",
        header_cap: "#d92b04",
      },
    },
  },
  plugins: [],
};
