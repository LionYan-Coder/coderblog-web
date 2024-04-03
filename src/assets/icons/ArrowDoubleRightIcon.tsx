import { type IconProps } from '~/assets';

export function ArrowDoubleRightIcon(props: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 20 20"
			{...props}
		>
			<path
				strokeLinecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M3.3 10h13.4m-5-5 5 5-5 5"
			></path>
		</svg>
	);
}
