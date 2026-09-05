import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        petroleum: {
          50: '#eef8f8',
          100: '#d6eeee',
          500: '#138b8b',
          700: '#0b5f63',
          900: '#073b43',
        },
        strategic: '#d49a2a',
      },
    },
  },
  plugins: [],
};

export default config;
