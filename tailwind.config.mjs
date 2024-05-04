/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		colors: {
			'blue': '#17b3bb',
			'purple': '#3D2B8C',
			'pink': '#ff57dd',
			'yellow': '#ffc82c',
			'primary-content': '#252560',
			'secondary-content': '#8f8faf',
			'primary': '#f0f0f8',
			'background': '#fafaff',
			'black': '#000500'
			
		  },
		  extend: {
			spacing: {
			  '128': '32rem',
			  '144': '36rem',
			},
			borderRadius: {
			  '4xl': '2rem',
			}
		  },
		  fontFamily: {
			display: ['Space Grotesk', 'ui-serif'],
			body: ['DM Sans', 'ui-sans-serif'],
			mono: ['Space Mono', 'ui-monospace']
		  }
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
