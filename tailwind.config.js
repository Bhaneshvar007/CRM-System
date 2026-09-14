/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0006D9",
        "primary-hover": "#1A22FF",
        "primary-active": "#0004A3",

        accent: "#00D4FF",
        "accent-hover": "#33DDFF",

        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",

        background: "#F8FAFC",
        card: "#FF0000",

        border: "#E5E7EB",

        textPrimary: "#111827",
        textSecondary: "#6B7280",
      },
    },
  },
  plugins: [],
}


// colors: {
//   primary: "#0006D9",
//   primaryHover: "#1A22FF",
//   primaryActive: "#0004A3",

//   accent: "#00D4FF",
//   accentHover: "#33DDFF",

//   success: "#22C55E",
//   warning: "#F59E0B",
//   danger: "#EF4444",

//   background: "#F8FAFC",
//   card: "#FFFFFF",

//   textPrimary: "#111827",
//   textSecondary: "#6B7280",

//   border: "#E5E7EB"
// }
