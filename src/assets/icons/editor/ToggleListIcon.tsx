import { SVGProps } from 'react';
import { IconProps } from '~/assets';

export function ToggleListIcon(props: IconProps = {}) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<path d="m3 10 2.5-2.5L3 5" />
			<path d="m3 19 2.5-2.5L3 14" />
			<path d="M10 6h11" />
			<path d="M10 12h11" />
			<path d="M10 18h11" />
		</svg>
	);
}
