'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Navs } from '~/config/nav';

const variants = {
	initial: { opacity: 0 },
	whileInView: {
		opacity: 1,
		transition: {
			staggerChildren: 0.5
		}
	}
};

export default function Footer() {
	return (
		<footer className="mt-32">
			<div className="sm:px-8">
				<div className="mx-auto w-full max-w-7xl lg:px-8">
					<div className="border-t border-zinc-100 pb-6 pt-10 dark:border-zinc-700/40">
						<div className="relative px-4 sm:px-8 lg:px-12">
							<div className="mx-auto max-w-2xl lg:max-w-5xl">
								<div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
									<ul className="relative flex gap-x-6 gap-y-1 ">
										{Navs.map((nav, index) => (
											<motion.li
												initial={{ opacity: 0, y: 20 }}
												whileInView={{ opacity: 1, y: 0 }}
												key={nav.link}
												viewport={{ once: true }}
												transition={{ delay: index * 0.1 + 0.1 }}
											>
												<Link
													href={nav.link}
													className="text-zinc-800 font-medium text-sm dark:text-zinc-200 hover:text-amber-800 dark:hover:text-amber-600  transition-colors"
												>
													{nav.label}
												</Link>
											</motion.li>
										))}
									</ul>
									<p className="text-sm text-zinc-400 dark:text-zinc-500">
										&copy; 2024 Lion Yan
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
