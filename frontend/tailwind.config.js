/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkPrimary: "#27374D",
        darkSecondary: "#526D82",
        darkAccent: "#9DB2BF",
        darkBackground: "#DDE6ED",
      },
    },
  },
  plugins: [],
};
