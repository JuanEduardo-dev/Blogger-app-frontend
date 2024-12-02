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
        'pallette-60-contrast': '#FAFAFA',
  			'pallette-30': '#F9FAFF',
  			'pallette-10': '#045988',
  			'pallette-10-contrast': '#1B3C59',
        'pallette-text-light': '#171717'
  		},
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #FAFAFA 50%, #F8F7F2 50%)'
      }
    },
  },
  plugins: [],
} satisfies Config;
