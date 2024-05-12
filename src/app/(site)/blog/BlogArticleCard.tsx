'use client';

import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRightIcon, CalendarIcon, CircleIcon, TagIcon } from '~/assets';
import Image from 'next/image';

export function RecentBlogArticleCard({ article }: { article: Article }) {
	return (
		<motion.article
			variants={{
				initial: { opacity: 0, y: 40 },
				animate: {
					opacity: 1,
					y: 0,
					transition: {
						type: 'spring'
					}
				}
			}}
			className="relative group"
		>
			<div className="absolute -inset-y-2.5 -inset-x-4 md:-inset-y-4 md:-inset-x-6 sm:rounded-2xl group-hover:bg-amber-50/70 dark:group-hover:bg-amber-800/50  opacity-0 scale-95 transition group-hover:scale-100 group-hover:opacity-100"></div>
			<CircleIcon className="hidden absolute right-full mr-6 top-2 text-slate-200 dark:text-slate-600 md:mr-12 w-[calc(0.5rem+1px)] h-[calc(0.5rem+1px)] overflow-visible sm:block" />
			<div className="relative grid grid-cols-1 sm:grid-cols-3">
				<div className="sm:col-span-2">
					<h3 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100  pt-8 lg:pt-0">
						{article.title}
					</h3>
					<dl className="absolute left-0 top-0 lg:left-auto lg:right-full lg:mr-[calc(6.5rem+1px)] text-slate-500 dark:text-slate-400">
						<dt className="sr-only">Date</dt>
						<dd className="whitespace-nowrap text-sm leading-6 dark:text-slate-400">
							<time dateTime={article.createAt}>
								{dayjs(article.createAt).format('DD/MM/YYYY')}
							</time>
						</dd>
					</dl>
					<div className="mt-2 mb-4 text-sm text-zinc-600 dark:text-zinc-400">
						<p>{article.summary}</p>
						<p className="relative mt-2 flex items-center opacity-85">
							<TagIcon />
							<span>{article.tags.join('、')}</span>
						</p>
					</div>
				</div>
				<Image
					src={article.coverUrl}
					alt={article.title}
					width={2880}
					height={1510}
					className="hidden sm:block sm:col-span-1 ml-3 object-contain"
				/>
			</div>
			<Link
				href={{ pathname: `/blog/${article.title}` }}
				className="text-sm flex items-center text-amber-700 group-hover:text-amber-800 transition-colors"
			>
				<span className="relative">
					阅读博客<span className="sr-only">, {article.title}</span>
				</span>
				<span className="absolute -inset-y-2.5 -inset-x-4 md:-inset-y-4 md:-inset-x-6 sm:rounded-2xl"></span>
				<ArrowRightIcon className="w-5 h-4 ml-2 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-85 transition-all ease-in-out duration-150" />
			</Link>
		</motion.article>
	);
}

export function BlogArticleCard({ article }: { article: Article }) {
	return (
		<motion.article
			variants={{
				initial: { opacity: 0, y: 40 },
				animate: {
					opacity: 1,
					y: 0
					// transition: {
					// 	type: 'spring'
					// }
				}
			}}
			className="group relative flex flex-col rounded-2xl border"
		>
			<Image
				src={article.coverUrl}
				alt={article.title}
				width={768}
				height={200}
				className="w-full rounded-t-2xl"
			/>
			<div className="px-5 py-4">
				<Link
					href={`/blog/${article.title}`}
					className="hover:underline underline-offset-1"
				>
					<h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
						{article.title}
					</h2>
				</Link>
				<p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
					{article.summary}
				</p>
				<div className="flex items-center space-x-3 justify-between my-3  text-sm text-zinc-400 dark:text-zinc-500">
					<time className="flex items-center space-x-2">
						<CalendarIcon />
						<span>{dayjs(article.createAt).format('DD/MM/YYYY')}</span>
					</time>
					<p className="relative flex items-center">
						<TagIcon />
						<span>{article.tags.join('、')}</span>
					</p>
				</div>
			</div>
		</motion.article>
	);
}
