/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      // Fill wide monitors: stepped max-widths so the content follows the window up to 1800px (default stopped at 1536px).
      screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px', w1: '1680px', w2: '1800px' },
    },
    extend: {
      colors: {
        'fana-navy': '#1E2B4F',
        'fana-primary': '#125DA3',
        'fana-secondary': '#DBEDF9',
        'fana-white': '#FFFFFF',
      },
      fontFamily: {
        'sans': ['Open Sans', 'Segoe UI', 'Noto Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'serif': ['Merriweather', 'Georgia', 'Times New Roman', 'serif'],
        'display': ['Merriweather', 'Georgia', 'Times New Roman', 'serif'],
        'body': ['Open Sans', 'Segoe UI', 'Noto Sans', 'system-ui', 'sans-serif'],
        'heading': ['Merriweather', 'Georgia', 'Times New Roman', 'serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      fontWeight: {
        'thin': '100',
        'extralight': '200',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900',
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0em',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
      },
    },
  },
  plugins: [],
}
