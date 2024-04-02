import dayjs from 'dayjs';
import Link from 'next/link';
import {
	ArrowRightIcon,
	CalendarIcon,
	CursorClickIcon,
	TagIcon
} from '~/assets';

export default function BlogArticleCard({ article }: { article: Article }) {
	return (
		<article className="group relative flex flex-col items-start">
			<h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
				<Link href={{ pathname: `/blog/${article.id}` }}>
					<span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
					<span className="relative z-10">{article.title}</span>
				</Link>
			</h2>
			<div className="relative z-10 flex justify-between mb-3 order-first text-sm text-zinc-400 dark:text-zinc-500 space-x-3">
				<span className="absolute inset-y-0 left-0 flex items-center">
					<span className="bg-zinc-200 dark:bg-zinc-500 w-0.5 h-4 rounded-full"></span>
				</span>
				<time className="flex items-center space-x-2">
					<CalendarIcon />
					<span>{dayjs(article.createAt).format('DD/MM/YYYY')}</span>
				</time>
				<span className="flex items-center space-x-2">
					<CursorClickIcon />
					<span>2000</span>
				</span>
			</div>

			<p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
				{article.summary}
			</p>
			<p className="relative z-10 mt-2 text-sm flex items-center text-zinc-500 dark:text-zinc-300 space-x-2">
				<TagIcon />
				<span>{article.tags.join('、')}</span>
			</p>
			<p className="relative z-10 mt-4 text-sm flex items-center text-amber-700 group-hover:text-amber-800 transition-colors">
				阅读更多{' '}
				<ArrowRightIcon className="w-5 h-4 ml-2 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-85 transition-all ease-in-out duration-150" />
			</p>

			<div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50"></div>
		</article>
	);
}
