/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9DC8C8',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '16px',
        md: '24px',
      },
    },
    fontFamily: {
      body: [
        '游ゴシック体',
        'YuGothic',
        '游ゴシック',
        'Yu Gothic',
        'sans-serif',
      ],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
}
