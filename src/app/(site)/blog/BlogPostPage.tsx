'use client';
import { Button, Container, MarkdownEditor, MarkdownText } from '~/components';
import Link from 'next/link';
import { CalendarIcon, TagIcon, UTurnLeftIcon } from '~/assets';
import { motion } from 'framer-motion';
import Image from 'next/image';
import dayjs from 'dayjs';
import Balancer from 'react-wrap-balancer';
import { MilkdownProvider } from '@milkdown/react';
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/react';

export function BlogPostPage({ post }: { post: Article }) {
	return (
		<Container className="mt-16 sm:mt-32">
			<div className="w-full relative">
				<Button
					asChild
					className="group z-20 mb-8 flex h-10 w-10 p-0 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 lg:z-10 xl:-top-1.5 xl:left-0 xl:mt-0"
					variant="secondary"
					aria-label="返回博客页面"
				>
					<Link href="/blog">
						<UTurnLeftIcon className="stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
					</Link>
				</Button>
				<article>
					<header className="relative flex flex-col items-center pb-5 after:absolute after:-bottom-1 after:block after:h-px after:w-full after:rounded after:bg-gradient-to-r after:from-zinc-400/20 after:via-zinc-200/10 after:to-transparent dark:after:from-zinc-600/20 dark:after:via-zinc-700/10">
						<motion.div
							className="relative mb-7 aspect-[240/135] w-full md:mb-12 md:w-[85%]"
							initial={{ opacity: 0, scale: 0.96, y: 10 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							transition={{
								duration: 0.35,
								type: 'spring',
								stiffness: 120,
								damping: 20
							}}
						>
							<div className="absolute z-0 hidden aspect-[240/135] w-full blur-xl saturate-150 after:absolute after:inset-0 after:hidden after:bg-white/50 dark:after:bg-black/50 md:block md:after:block">
								<Image
									src={post.coverUrl}
									alt=""
									className="select-none"
									unoptimized
									fill
									aria-hidden={true}
								/>
							</div>
							<Image
								src={post.coverUrl}
								alt={post.title}
								className="select-none rounded-2xl ring-1 ring-zinc-900/5 transition dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 md:rounded-3xl"
								placeholder="blur"
								blurDataURL={post.coverUrl}
								unoptimized
								fill
							/>
						</motion.div>
						<motion.div
							className="flex w-full items-center space-x-4 text-sm font-medium text-zinc-600/80 dark:text-zinc-400/80"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.15,
								type: 'spring',
								stiffness: 150,
								damping: 20,
								delay: 0.1
							}}
						>
							<time
								dateTime={post.updateAt}
								className="flex items-center space-x-1.5"
							>
								<CalendarIcon />
								<span>{dayjs(post.updateAt).format('YYYY/MM/DD')}</span>
							</time>
							<span className="inline-flex items-center space-x-1.5">
								<TagIcon />
								<span>{post.tags?.join(', ')}</span>
							</span>
						</motion.div>
						<motion.h1
							className="mt-6 w-full text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.2,
								type: 'spring',
								stiffness: 150,
								damping: 30,
								delay: 0.2
							}}
						>
							<Balancer>{post.title}</Balancer>
						</motion.h1>
						<motion.p
							className="my-5 w-full text-sm font-medium text-zinc-500"
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.2,
								type: 'spring',
								stiffness: 150,
								damping: 20,
								delay: 0.23
							}}
						>
							{post.summary}
						</motion.p>
					</header>
					<div className="mt-8">
						<MilkdownProvider>
							<ProsemirrorAdapterProvider>
								<MarkdownText value={post.content} />
							</ProsemirrorAdapterProvider>
						</MilkdownProvider>
					</div>
				</article>
			</div>
		</Container>
	);
}
