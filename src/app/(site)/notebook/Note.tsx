'use client';

import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRightIcon, CalendarIcon } from '~/assets';

export function NoteItem({ note }: { note: Notebook }) {
	return (
		<motion.article
			variants={{
				initial: { opacity: 0, y: '40%' },
				animate: {
					opacity: 1,
					y: 0,
					transition: {
						type: 'spring'
					}
				}
			}}
			className="relative md:grid md:grid-cols-4 md:items-baseline"
		>
			<div className="md:col-span-3 group flex flex-col relative flex-1">
				<h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
					<Link href={{ pathname: `/blog/${note.id}` }}>
						<span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
						<span className="relative z-10">{note.title}</span>
					</Link>
				</h2>
				<time className="relative z-10 flex justify-between mb-3 order-first text-sm text-zinc-400 dark:text-zinc-500 space-x-3 md:hidden">
					<span className="absolute inset-y-0 left-0 flex items-center">
						<span className="bg-zinc-200 dark:bg-zinc-500 w-0.5 h-4 rounded-full"></span>
					</span>
					<time className="flex items-center space-x-2">
						<CalendarIcon />
						<span>{dayjs(note.createAt).format('DD/MM/YYYY')}</span>
					</time>
				</time>
				<p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
					{note.summary}
				</p>
				<p className="relative z-10 mt-4 text-sm flex items-center text-amber-700 group-hover:text-amber-800 transition-colors">
					阅读详情{' '}
					<ArrowRightIcon className="w-5 h-4 ml-2 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-85 transition-all ease-in-out duration-150" />
				</p>
				<div className="absolute -inset-x-4 -inset-y-6 z-0 bg-zinc-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50 opacity-0 scale-95 transition group-hover:scale-100 group-hover:opacity-100"></div>
			</div>
			<time className="order-first text-sm mb-3 hidden md:block text-zinc-400 dark:text-zinc-500">
				{dayjs(note.createAt).format('DD/MM/YYYY')}
			</time>
		</motion.article>
	);
}

export function NoteList({ notes }: { notes: Notebook[] }) {
	return (
		<motion.div
			className="max-w-3xl flex flex-col space-y-16"
			variants={{
				initial: { opacity: 0 },
				animate: {
					opacity: 1,
					transition: {
						staggerChildren: 0.1
					}
				}
			}}
			initial="initial"
			animate="animate"
		>
			{notes.map((note) => (
				<NoteItem note={note} key={note.id} />
			))}
		</motion.div>
	);
}
