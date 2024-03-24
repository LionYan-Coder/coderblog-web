import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-light': 'linear-gradient(180deg,#eff1f6e6,#f0f2f6e6)',
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			},
			maxHeight: {
				'd-screen': '100dvh'
			},

			height: {
				'd-screen': '100dvh'
			},
			width: {
				'd-screen': '100dvw'
			},
			screens: {
				desktop: '1440px'
			},
			colors: {
				transparent: 'transparent',
				current: 'currentColor',
				neutral: {
					50: '#fafafc',
					100: '#f5f5f5',
					200: '#efefef',
					300: '#c0c5d0',
					400: '#d8d7da',
					500: '#737373',
					600: '#667085',
					700: '#404040',
					800: '#262626',
					900: '#1A1A1A',
					950: '#0a0a0a'
				},
				purple: {
					800: '#6941c6'
				}
			}
		}
	},
	plugins: []
};
export default config;
