import { cn } from '~/lib/utils';

export function EntityStatusCard({ published }: { published?: boolean }) {
	return (
		<div
			className={cn(
				'border py-4 px-6 text-center rounded-md text-sm font-medium flex items-center transition-colors',
				published
					? 'border-green-300 bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500 dark:border-green-600'
					: 'border-sky-300 bg-sky-100 text-sky-800 dark:bg-sky-800/30 dark:text-sky-500 dark:border-sky-600'
			)}
		>
			<span
				className={cn(
					'mr-2 w-1 h-1 rounded-full',
					published ? 'bg-green-600' : 'bg-sky-600'
				)}
			></span>
			{published ? '编辑发布版本' : '编辑草稿版本'}
		</div>
	);
}
