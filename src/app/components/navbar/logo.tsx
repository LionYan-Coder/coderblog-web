import { IconLogo } from "../icon";

function Logo() {
	return (
		<div className="flex items-center">
			<IconLogo className="text-4xl" />
			<span className="ml-1 mt-1 text-2xl font-medium font-mono">Coder</span>
		</div>
	);
}

export default Logo