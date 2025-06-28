// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      transitionProperty: {
        'opacity': 'opacity',
      },
      colors: {
        primary: {
          red: "var(--primary-red)",
          blue: "var(--primary-blue)",
          background: "var(--primary-background)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          background: "var(--secondary-background)",
          foreground: "var(--secondary-foreground)",
          light: "var(--secondary-light)",
          dark: "var(--secondary-dark)",
        },
        accent: {
          DEFAULT: "var(--accent-color)",
          foreground: "var(--accent-foreground)",
          light: "var(--accent-light)",
          dark: "var(--accent-dark)",
        },
        border: {
          primary: "var(--border-primary)",
          secondary: "var(--border-secondary)",
          light: "var(--border-light)",
          dark: "var(--border-dark)",
        },
      },

      // ✅ ADD THIS BELOW
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
