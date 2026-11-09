export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#09080f',
        paper: '#f5f2ff',
        violet: '#8b5cf6',
        fuchsia: '#e879f9',
        cyan: '#67e8f9',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      keyframes: {
        'soft-pulse': {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.04)' },
        },
        'float-in': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'soft-pulse': 'soft-pulse 8s ease-in-out infinite',
        'float-in': 'float-in 650ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
      },
      boxShadow: {
        glow: '0 0 70px rgba(139, 92, 246, 0.22)',
      },
    },
  },
  plugins: [],
}
