'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Navs } from '~/config/nav';

const variantItm = {
	initial: { opacity: 0, y: '100%' },
	whileInView: {
		opacity: 1,
		y: 0
	}
};

export default function Footer() {
	return (
		<footer className="mt-32">
			<div className="sm:px-8">
				<div className="mx-auto w-full max-w-7xl lg:px-8">
					<div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
						<div className="relative px-4 sm:px-8 lg:px-12">
							<div className="mx-auto max-w-2xl lg:max-w-5xl">
								<div className="flex flex-col justify-between gap-6 md:flex-row">
									<ul className="flex gap-x-6 gap-y-1 text-zinc-800 font-medium text-sm dark:text-zinc-200 hover:text-amber-800 dark:hover:text-amber-600  transition-colors">
										{Navs.map((nav) => (
											<motion.li
												initial={{ opacity: 0, y: 20 }}
												whileInView={{ opacity: 0, y: 0 }}
												key={nav.link}
												aria-label={nav.label}
												viewport={{ once: true }}
											>
												<Link href={nav.link}>{nav.label}</Link>
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
