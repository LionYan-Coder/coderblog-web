'use client';

import {
	UserArrowLeftIcon,
	SunIcon,
	MoonIcon,
	XIcon,
	GitHubBrandIcon,
	GoogleBrandIcon,
	ArrowDoubleRightIcon
} from '~/assets';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import {
	Button,
	Card,
	Container,
	Dialog,
	Input,
	Label,
	Tooltip
} from '~/components/ui';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Navigation } from './Navigation';
import { domain } from '~/config/constants';
import Image from 'next/image';
import Link from 'next/link';
export default function Header() {
	return (
		<header className="relative w-full z-50">
			<div className="sticky top-0 h-16 pt-6">
				<Container>
					<div className="flex gap-4">
						<div className="flex-1 flex"></div>
						<div className="flex-1 flex justify-end md:justify-center">
							<Navigation.Mobile className="pointer-events-auto relative z-50 md:hidden" />
							<Navigation.Desktop className="pointer-events-auto relative z-50 hidden md:block" />
						</div>
						<div className="flex gap-3 justify-end md:flex-1">
							<User />
							<ThemeSwither />
						</div>
					</div>
				</Container>
			</div>
		</header>
	);
}

function User() {
	const [tooltipOpen, setTooltipOpen] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	return (
		<Tooltip.Provider delayDuration={400}>
			<Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
				<Tooltip.Root open={tooltipOpen} onOpenChange={setTooltipOpen}>
					<Tooltip.Trigger asChild>
						<Dialog.Trigger asChild>
							<button
								className="group h-10 flex items-center rounded-full bg-gradient-to-b from-zinc-50/20 to-white/80 px-3 text-xl font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md focus:outline-none focus-visible:ring-2 dark:from-zinc-900/30 dark:to-zinc-800/80 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20 dark:focus-visible:ring-yellow-500/80"
								aria-expanded={false}
								type="button"
							>
								<UserArrowLeftIcon />
							</button>
						</Dialog.Trigger>
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
				<AnimatePresence>
					{dialogOpen && (
						<Dialog.Portal forceMount>
							<DialogPrimitive.Overlay asChild>
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									className="fixed z-50 inset-0 backdrop-blur-sm backdrop-saturate-150 bg-[hsla(240,5%,96%,.4)] dark:bg-[rgba(24,24,27,.4)]"
								></motion.div>
							</DialogPrimitive.Overlay>
							<DialogPrimitive.Content asChild>
								<motion.div
									initial={{ opacity: 0, scale: 0.95 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.95 }}
									className="relative z-50 my-20"
								>
									<Card className="w-[25rem] max-w-[calc(100vw-0.75rem)] md:max-w-[calc(100vw-5rem)] backdrop-blur-xl backdrop-saturate-150 bg-[hsla(0,0%,98%,.8)] dark:bg-[rgba(24,24,27,.4)] dark:backdrop-blur-xl">
										<Image
											className="rounded-full absolute left-1/2 -translate-x-1/2 -top-9 backdrop-blur-xl backdrop-saturate-150 bg-[unset]"
											src="/avatar_transparent.png"
											width={60}
											height={60}
											alt="lion"
										/>
										<Card.Header className="px-8">
											<Card.Title className="text-xl">登录</Card.Title>
											<Card.Description className="text-base">
												继续使用 {domain}
											</Card.Description>
										</Card.Header>
										<Card.Content className="px-8">
											<div className="mt-5 flex flex-col gap-2">
												<Button
													size="lg"
													className="group w-full bg-[unset] backdrop-blur-sm justify-start gap-4 font-normal hover:bg-black/5"
													variant="outline"
												>
													<GitHubBrandIcon className="text-xl" />
													<span className="flex-1 text-start">
														使用GitHub登录
													</span>
													<ArrowDoubleRightIcon className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-70 group-hover:translate-x-0 transition-all" />
												</Button>
												<Button
													className="group w-full bg-[unset] backdrop-blur-sm justify-start gap-4 font-normal hover:bg-black/5"
													variant="outline"
													size="lg"
												>
													<GoogleBrandIcon className="text-xl" />
													<span className="flex-1  text-start">
														使用Google登录
													</span>
													<ArrowDoubleRightIcon className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-70 group-hover:translate-x-0 transition-all" />
												</Button>
											</div>
											<div className="flex items-center my-6 gap-3">
												<div className="flex-1 h-[1px] bg-zinc-950/20 dark:bg-zinc-300/30"></div>
												<span className="text-sm text-zinc-700/80 dark:text-zinc-300 font-medium">
													或者
												</span>
												<div className="flex-1 h-[1px] bg-zinc-950/20 dark:bg-zinc-300/30"></div>
											</div>
											<div className="flex flex-col gap-2">
												<Label htmlFor="email">电子邮件地址</Label>
												<Input />
												<Button className="w-full block mt-2 text-xs font-semibold ">
													继续
												</Button>
											</div>
											<div className="mt-6 text-sm">
												<span className="text-zinc-700 dark:text-zinc-400">
													还没有账户？
												</span>
												<Link className="underline" href="/">
													注册
												</Link>
											</div>
										</Card.Content>
										<DialogPrimitive.Close
											autoFocus={false}
											className="absolute text-lg right-4 top-4 p-1 rounded-sm opacity-60 bg-transparent hover:bg-zinc-400/30 hover:opacity-80 focus:ring-2 focus:ring-ring focus:ring-offset-1 transition-all"
										>
											<XIcon />
											<span className="sr-only">关闭</span>
										</DialogPrimitive.Close>
									</Card>
								</motion.div>
							</DialogPrimitive.Content>
						</Dialog.Portal>
					)}
				</AnimatePresence>
			</Dialog.Root>
		</Tooltip.Provider>
	);
}

function ThemeSwither() {
	const [tooltipOpen, setTooltipOpen] = useState(false);
	const { theme, setTheme } = useTheme();

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
