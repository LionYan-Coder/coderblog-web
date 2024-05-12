import { IconProps } from '~/assets';

export function CircleIcon(props: IconProps = {}) {
	return (
		<svg viewBox="0 0 9 9" {...props}>
			<circle
				cx="4.5"
				cy="4.5"
				r="4.5"
				stroke="currentColor"
				className="fill-white dark:fill-slate-900"
				strokeWidth="2"
			></circle>
		</svg>
	);
}
