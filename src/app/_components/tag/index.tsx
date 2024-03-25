import classNames from 'classnames';

interface ITagProps {
	text: string;
}

const colors = {
	Red: 'bg-red-50 text-red-800',
	Orange: 'bg-orange-50 text-orange-800',
	Amber: 'bg-amber-50 text-amber-800',
	Yellow: 'bg-yellow-50 text-yellow-800',
	Lime: 'bg-lime-50 text-lime-800',
	Green: 'bg-green-50 text-green-800',
	Emerald: 'bg-emerald-50 text-emerald-800',
	Teal: 'bg-teal-50 text-teal-800',
	Cyan: 'bg-cyan-50 text-cyan-800',
	Sky: 'bg-sky-50 text-sky-800',
	Blue: 'bg-blue-50 text-blue-800',
	Indigo: 'bg-indigo-50 text-indigo-800',
	Violet: 'bg-violet-50 text-violet-800',
	Purple: 'bg-purple-50 text-purple-800',
	Fuchsia: 'bg-fuchsia-50 text-fuchsia-800',
	Pink: 'bg-pink-50 text-pink-800',
	Rose: 'bg-rose-50 text-rose-800'
} as Record<string, string>;
const colorKeys = Object.keys(colors);
export default function Tag({ text }: ITagProps) {
	const colorKeyNumber = Math.floor(Math.random() * colorKeys.length);
	const key = colorKeys[colorKeyNumber];

	const cls = classNames(
		'py-[2px] px-[10px] rounded-2xl text-sm font-medium',
		colors[key]
	);
	return <span className={cls}>{text}</span>;
}
