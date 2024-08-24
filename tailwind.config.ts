import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: { max: '600px' },
    },
    extend: {
      colors: {
        gray: {
          100: '#E1E1E6',
          200: '#A9A9B2',
          400: '#7C7C8A',
          600: '#323238',
          800: '#202024',
          900: '#121214',
        },
        green: {
          500: '#00B37E',
          600: '#00875F',
        },
      },
    },
    plugins: [],
  },
}

export default config
