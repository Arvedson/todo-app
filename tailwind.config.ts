import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-bg)", // Asegúrate de que esta variable esté definida en tu CSS
        text: "var(--color-text)", // Variable para el color de texto
        primary: "var(--color-primary)", // Variable para el color primario
        secondary: "var(--color-secondary)", // Variable para el color secundario
        accent: "var(--color-accent)", // Variable para el color de acento
        border: "var(--color-border)", // Variable para el color de los bordes
      },
    },
  },
  plugins: [],
};
export default config;
