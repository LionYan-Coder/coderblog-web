import { AppleIcon } from "~/assets";

export default function Mouse() {
	return (
		<div className="mouse" aria-hidden="true">
			<span className="mouse__wheel"></span>
			<AppleIcon className="opacity-[0.15] ml-1 transform scale-75" />
		</div>
	);
}
