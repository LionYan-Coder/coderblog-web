'use client';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type ReactNode, useCallback, useState } from 'react';
import { Dialog } from '~/components/ui';
import { Navs } from '~/config/nav';
import { cn } from '~/lib/utils';

function MobileNav({ className }: { className?: string }) {
	const [dialogOpen, setDialogOpen] = useState(false);
	return (
		<Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
			<Dialog.Trigger asChild>
				<motion.button
					initial={{ opacity: 0, y: -15 }}
					animate={{ opacity: 1, y: 0 }}
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
				</motion.button>
			</Dialog.Trigger>

			<Dialog.Content className="top-8 inset-4 bottom-auto p-8 rounded-3xl bg-gradient-to-b from-zinc-100/75 to-white ring-1 ring-zinc-900/5 dark:from-zinc-900/50 dark:to-zinc-900 dark:ring-zinc-800">
				<Dialog.Header>
					<Dialog.Title className="text-base font-medium text-zinc-600 dark:text-zinc-400">
						站内导航
					</Dialog.Title>
				</Dialog.Header>
				<nav className="mt-4">
					<ul className="divide-y text-base  text-zinc-800 dark:text-zinc-300 divide-zinc-500/20 flex flex-col">
						{Navs.map((nav) => (
							<li key={nav.link} onClick={() => setDialogOpen(false)}>
								<Link href={nav.link} className="py-3 block">
									{nav.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</Dialog.Content>
		</Dialog.Root>
	);
}

function DesktopNav({ className }: { className?: string }) {
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const radius = useMotionValue(0);
	const handleMouseMove = useCallback(
		({ clientX, clientY, currentTarget }: React.MouseEvent) => {
			const bounds = currentTarget.getBoundingClientRect();
			mouseX.set(clientX - bounds.left);
			mouseY.set(clientY - bounds.top);
			radius.set(Math.sqrt(bounds.width ** 2 + bounds.height ** 2) / 2.5);
		},
		[mouseX, mouseY, radius]
	);
	const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, var(--spotlight-color) 0%, transparent 65%)`;

	return (
		<motion.nav
			initial={{ opacity: 0, y: -15 }}
			animate={{ opacity: 1, y: 0 }}
			onMouseMove={handleMouseMove}
			className={cn(
				`group relative 
				rounded-full bg-gradient-to-b from-zinc-50/20 to-white/80 dark:from-zinc-900/30 dark:to-zinc-800/80  
				shadow-lg shadow-zinc-800/5 backdrop-blur-md  
				ring-1 ring-zinc-900/5 dark:ring-white/10 dark:hover:ring-white/20
				[--spotlight-color:rgb(253_230_138_/_0.6)] dark:[--spotlight-color:rgb(251_191_36_/_0.07)]`,
				className
			)}
		>
			<motion.div
				className="pointer-events-none absolute -inset-px rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
				style={{ background }}
				aria-hidden="true"
			/>
			<ul className="flex px-3 dark:text-zinc-200 text-zinc-800 text-sm leading-6 font-medium ">
				{Navs.map((nav) => (
					<NavItem href={nav.link} key={nav.link}>
						{nav.label}
					</NavItem>
				))}
			</ul>
		</motion.nav>
	);
}

function NavItem({ href, children }: { href: string; children: ReactNode }) {
	const isActive = usePathname() === href;
	return (
		<li>
			<Link
				href={href}
				className={cn(
					'relative px-3 py-2 block whitespace-nowrap',
					isActive
						? 'text-amber-800 dark:text-amber-600'
						: 'hover:text-amber-800 dark:hover:text-amber-600'
				)}
			>
				{children}
				{isActive && (
					<motion.span
						className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-lime-700/0 via-amber-700/70 to-amber-700/0 dark:from-amber-400/0 dark:via-amber-400/40 dark:to-amber-400/0"
						layoutId="active-nav-item"
						layout
					/>
				)}
			</Link>
		</li>
	);
}

export const Navigation = {
	Mobile: MobileNav,
	Desktop: DesktopNav
} as const;
