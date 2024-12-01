import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
  			'pallette-60': '#FFFFFF',
  			'pallette-30': '#F9FAFF',
  			'pallette-10': '#045988',
  			'pallette-10-contrast': '#1B3C59'
  		},
    },
  },
  plugins: [],
} satisfies Config;
