import { type IconProps } from '~/assets';

export function CheckIcon(props: IconProps = {}) {
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
			<path d="M20 6 9 17l-5-5" />
		</svg>
	);
}
