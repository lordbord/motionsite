/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: '#FF6AD5',
				secondary: '#C774E8',
				tertiary: '#AD8CFF',
			},
			backgroundImage: {
				'gradient-primary': 'linear-gradient(to bottom right, #FF6AD5, #C774E8, #AD8CFF)',
			},
			boxShadow: {
				'glow-sm': '0 0 10px rgba(255, 106, 213, 0.3)',
				'glow': '0 0 15px rgba(255, 106, 213, 0.5)',
				'glow-lg': '0 0 30px rgba(255, 106, 213, 0.5)',
			},
			animation: {
				'float': 'float 4s ease-in-out infinite',
				'glitch': 'glitch 0.5s infinite',
			},
			keyframes: {
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				glitch: {
					'0%, 100%': { transform: 'translate(0)' },
					'20%': { transform: 'translate(-1px, 1px)' },
					'40%': { transform: 'translate(-1px, -1px)' },
					'60%': { transform: 'translate(1px, 1px)' },
					'80%': { transform: 'translate(1px, -1px)' },
				},
			},
		},
	},
	plugins: [],
}
