import { cn } from '~/lib/utils';

interface EntityStatusCardProps {
	published?: boolean;
	publishedText?: string;
	unPublishedText?: string;
	dot?: boolean;
	className?: string;
}

export function CardStatus({
	published,
	className,
	publishedText = '编辑发布版本',
	unPublishedText = '编辑草稿版本',
	dot = true
}: EntityStatusCardProps) {
	return (
		<div
			className={cn(
				'border py-4 px-6 text-center rounded-md text-sm font-medium flex items-center transition-colors',
				published
					? 'border-green-300 bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500 dark:border-green-600'
					: 'border-sky-300 bg-sky-100 text-sky-800 dark:bg-sky-800/30 dark:text-sky-500 dark:border-sky-600',
				className
			)}
		>
			{dot && (
				<span
					className={cn(
						'mr-2 w-1 h-1 rounded-full',
						published ? 'bg-green-600' : 'bg-sky-600'
					)}
				></span>
			)}

			{published ? publishedText : unPublishedText}
		</div>
	);
}
