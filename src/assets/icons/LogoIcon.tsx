import { type IconProps } from '~/assets';

export function LogoIcon(props: IconProps) {
	return (
		<svg
			width="1em"
			height="1em"
			viewBox="0 0 200 200"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<circle cx="100" cy="100" r="100" fill="#0E0518" />
			<path
				d="M160 100C160 133.137 133.137 160 100 160C66.8629 160 40 133.137 40 100C40 66.8629 66.8629 40 100 40C133.137 40 160 66.8629 160 100Z"
				fill="white"
			/>
			<rect x="119" y="88" width="50" height="24" fill="#0E0518" />
			<circle cx="100" cy="100" r="35" fill="#0E0518" />
		</svg>
	);
}
