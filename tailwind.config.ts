import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
const config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./_components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}'
	],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					900: '#000212'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				success: {
					DEFAULT: 'var(--success)',
					foreground: 'hsl(var(--success-foreground))'
				},
				info: {
					DEFAULT: 'var(--info)',
					foreground: 'hsl(var(--info-foreground))'
				},
				warning: {
					DEFAULT: 'var(--warning)',
					foreground: 'hsl(var(--warning-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'intro-scroll': {
					'0%': {
						transform: 'translateY(0)',
						opacity: '0'
					},
					'20%': {
						transform: 'translateY(2px)',
						opacity: '1'
					},
					'100%': {
						transform: 'translateY(8px)',
						opacity: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'intro-scroll': 'intro-scroll 2s ease infinite'
			},
			fontFamily: {
				sans: ['var(--font-sans)', ...fontFamily.sans]
			},
			boxShadow: {
				'table-right': 'inset -10px 0 8px -8px rgba(5, 5, 5, 0.06)',
				'table-left': 'inset 10px 0 8px -8px rgba(5, 5, 5, 0.06)'
			}
		}
	},
	plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')]
} satisfies Config;

export default config;
