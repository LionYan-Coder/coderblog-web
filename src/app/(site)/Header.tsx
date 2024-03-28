'use client';

import { UserArrowLeftIcon } from '~/assets';
import { Tooltip } from '~/components/ui/Tooltip';
import { motion, AnimatePresence } from 'framer-motion';
import { HTMLAttributes, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '~/assets';
import { Dialog } from '~/components/ui/Dialog';
import Link from 'next/link';
import { cn } from '~/lib/utils';
import { Container } from '~/components/ui';
export default function Header() {
	return (
		<header className="relative w-full z-50">
			<div className="sticky top-0 h-16 pt-6">
				<Container>
					<div className="flex gap-4">
						<div className="flex-1" />
						<MobileNav className="pointer-events-auto relative z-50 md:hidden" />
						<DesktopNav className="pointer-events-auto relative z-50 hidden md:block" />
						<div className="flex gap-3 justify-end">
							<User />
							<ThemeSwither />
						</div>
					</div>
				</Container>
			</div>
		</header>
	);
}

function MobileNav({ className }: { className?: string }) {
	const navs = ['首页', '博客', '杂记', '留言墙'];
	const [dialogOpen, setDialogOpen] = useState(false);
	return (
		<Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
			<Dialog.Trigger asChild>
				<button
					className={cn(
						'group flex items-center rounded-full bg-gradient-to-b from-zinc-50/20 to-white/80 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md focus:outline-none focus-visible:ring-2 dark:from-zinc-900/30 dark:to-zinc-800/80 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20 dark:focus-visible:ring-yellow-500/80',
						className
					)}
					aria-expanded={false}
					type="button"
				>
					菜单
					<svg
						viewBox="0 0 8 6"
						aria-hidden="true"
						className="ml-2 h-auto w-3 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400"
					>
						<path
							d="M1.75 1.75 4 4.25l2.25-2.5"
							fill="none"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			</Dialog.Trigger>

			<Dialog.Content className="top-8 inset-4 bottom-auto p-8 rounded-3xl bg-gradient-to-b from-zinc-100/75 to-white ring-1 ring-zinc-900/5 dark:from-zinc-900/50 dark:to-zinc-900 dark:ring-zinc-800">
				<Dialog.Header>
					<Dialog.Title className="text-base font-medium text-zinc-600 dark:text-zinc-400">
						站内导航
					</Dialog.Title>
				</Dialog.Header>
				<nav className="mt-4">
					<ul className="divide-y text-base  text-zinc-800 dark:text-zinc-300 divide-zinc-500/20 flex flex-col">
						{navs.map((nav) => (
							<li key={nav}>
								<Link href="/" className="py-3 block">
									{nav}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</Dialog.Content>
		</Dialog.Root>
	);
}

function DesktopNav({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return <nav className={cn(className)} {...props}></nav>;
}

function User() {
	const [tooltipOpen, setTooltipOpen] = useState(false);
	return (
		<Tooltip.Provider delayDuration={400}>
			<Tooltip.Root open={tooltipOpen} onOpenChange={setTooltipOpen}>
				<Tooltip.Trigger asChild>
					<button
						className="group h-10 flex items-center rounded-full bg-gradient-to-b from-zinc-50/20 to-white/80 px-3 text-xl font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md focus:outline-none focus-visible:ring-2 dark:from-zinc-900/30 dark:to-zinc-800/80 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20 dark:focus-visible:ring-yellow-500/80"
						aria-expanded={false}
						type="button"
					>
						<UserArrowLeftIcon />
					</button>
				</Tooltip.Trigger>

				<AnimatePresence>
					{tooltipOpen && (
						<Tooltip.Portal forceMount>
							<Tooltip.Content asChild>
								<motion.div
									initial={{ opacity: 0, scale: 0.96 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.95 }}
								>
									用户登录
								</motion.div>
							</Tooltip.Content>
						</Tooltip.Portal>
					)}
				</AnimatePresence>
			</Tooltip.Root>
		</Tooltip.Provider>
	);
}

function ThemeSwither() {
	const [tooltipOpen, setTooltipOpen] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		console.log('theme', theme);
	}, [theme]);

	return (
		<Tooltip.Provider delayDuration={400}>
			<Tooltip.Root open={tooltipOpen} onOpenChange={setTooltipOpen}>
				<Tooltip.Trigger asChild>
					<button
						className="group h-10 flex  items-center rounded-full bg-gradient-to-b from-zinc-50/20 to-white/80 px-3 text-xl font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md focus:outline-none focus-visible:ring-2 dark:from-zinc-900/30 dark:to-zinc-800/80 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20 dark:focus-visible:ring-yellow-500/80"
						aria-expanded={false}
						type="button"
						onClick={() => setTheme(theme !== 'dark' ? 'dark' : 'light')}
					>
						<AnimatePresence initial={false} mode="popLayout">
							{theme === 'dark' ? (
								<motion.div
									key="moon"
									initial={{ opacity: 0, translateY: 25 }}
									animate={{ opacity: 1, translateY: 0 }}
									exit={{ opacity: 0, translateY: -20 }}
								>
									<MoonIcon />
								</motion.div>
							) : (
								<motion.div
									key="sun"
									initial={{ opacity: 0, translateY: 25 }}
									animate={{ opacity: 1, translateY: 0 }}
									exit={{ opacity: 0, translateY: -20 }}
								>
									<SunIcon />
								</motion.div>
							)}
						</AnimatePresence>
					</button>
				</Tooltip.Trigger>

				<AnimatePresence>
					{tooltipOpen && (
						<Tooltip.Portal forceMount>
							<Tooltip.Content asChild>
								<motion.div
									initial={{ opacity: 0, scale: 0.96 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.95 }}
								>
									{theme === 'light' ? '浅色主题' : '深色主题'}
								</motion.div>
							</Tooltip.Content>
						</Tooltip.Portal>
					)}
				</AnimatePresence>
			</Tooltip.Root>
		</Tooltip.Provider>
	);
}
