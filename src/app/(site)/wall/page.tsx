'use client';
import { motion } from 'framer-motion';
import { Container } from '~/components/ui';

export default function Wall() {
	return (
		<Container className="mt-16 sm:mt-20">
			<header className="max-w-2xl">
				<h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
					留言墙
				</h1>
				<p className="my-6 text-base text-zinc-600 dark:text-zinc-400">
					<span className="text-balance">
						你好，很高兴你的到来，你可以在这里留下你的反馈、交流与讨论
					</span>
				</p>
			</header>

			<div className="mt-16 sm:mt-20">
				<motion.div
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
					whileInView="animate"
					className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
				>
					{Array.from({ length: 10 }, (_, index) => index).map((item) => (
						<motion.div
							variants={{
								initial: { opacity: 0, y: 20 },
								animate: {
									opacity: 1,
									y: 0,
									transition: {
										type: 'spring'
									}
								}
							}}
							className="bg-yellow-200 text-zinc-800 aspect-square border border-zinc-400/40 shadow"
							key={item}
							whileHover={{ scale: 1.12 }}
						>
							<div className="h-1 bg-yellow-400 w-full"></div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</Container>
	);
}
