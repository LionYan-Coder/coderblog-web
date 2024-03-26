import { type IconProps } from '~/assets';

export function ArrowUpRightIcon(props: IconProps) {
	return (
		<svg
			width="1em"
			height="1em"
			viewBox="0 0 24 28"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M7 21L17 11M17 11H7M17 11V21"
				stroke="#1A1A1A"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
