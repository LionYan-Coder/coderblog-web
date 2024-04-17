'use client';
import { HTMLAttributes, useState } from 'react';
import { useTheme } from 'next-themes';
import { Tooltip } from '~/components/ui';
import { AnimatePresence, motion } from 'framer-motion';
import { MoonIcon, SunIcon } from '~/assets';
import { cn } from '~/lib/utils';

export function ThemeSwitcher({
	className,
	side = 'top',
	...rest
}: HTMLAttributes<HTMLButtonElement> & {
	side?: 'top' | 'left' | 'bottom' | 'right';
}) {
	const [tooltipOpen, setTooltipOpen] = useState(false);
	const { theme, setTheme } = useTheme();

	return (
		<Tooltip.Provider delayDuration={300} disableHoverableContent>
			<Tooltip.Root open={tooltipOpen} onOpenChange={setTooltipOpen}>
				<Tooltip.Trigger asChild>
					<button
						className={cn(
							'group h-10 flex items-center justify-center rounded-full bg-gradient-to-b from-zinc-50/20 to-white/80 px-3 text-xl font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md focus:outline-none focus-visible:ring-2 dark:from-zinc-900/30 dark:to-zinc-800/80 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20 dark:focus-visible:ring-yellow-500/80',
							className
						)}
						type="button"
						onClick={() => setTheme(theme !== 'dark' ? 'dark' : 'light')}
						{...rest}
					>
						<AnimatePresence initial={false} mode="popLayout">
							{theme === 'dark' ? (
								<motion.div
									key="moon"
									initial={{ opacity: 0, translateY: 15 }}
									animate={{ opacity: 1, translateY: 0 }}
									exit={{ opacity: 0, translateY: -20 }}
								>
									<MoonIcon />
								</motion.div>
							) : (
								<motion.div
									key="sun"
									initial={{ opacity: 0, translateY: 15 }}
									animate={{ opacity: 1, translateY: 0 }}
									exit={{ opacity: 0, translateY: -20 }}
								>
									<SunIcon className="text-amber-800" />
								</motion.div>
							)}
						</AnimatePresence>
					</button>
				</Tooltip.Trigger>

				<AnimatePresence>
					{tooltipOpen && (
						<Tooltip.Portal forceMount>
							<Tooltip.Content side={side} asChild>
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
