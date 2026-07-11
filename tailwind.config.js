/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/dashboard/**/*.{js,jsx}",
    "./src/dashboard/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "var(--color-surface)",
          muted: "var(--color-surface-muted)",
          hover: "var(--color-surface-hover)",
          border: "var(--color-surface-border)",
        },
        ink: {
          DEFAULT: "var(--color-ink)",
          muted: "var(--color-ink-muted)",
          faint: "var(--color-ink-faint)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
        },
        violet: {
          50: "#f5f3ff",
          100: "#ede9fe",
          600: "#7c3aed",
          700: "#6d28d9",
        },
      },
      boxShadow: {
        soft: "0 1px 2px rgba(11, 11, 15, 0.04), 0 4px 12px rgba(11, 11, 15, 0.04)",
        card: "0 1px 3px rgba(11, 11, 15, 0.06), 0 8px 24px rgba(11, 11, 15, 0.06)",
        toolbar: "0 1px 0 rgba(11, 11, 15, 0.05)",
      },
      fontFamily: {
        sans: [
          "PP Neue Montreal",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
