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
import {
	motion,
	AnimatePresence,
	useMotionValue,
	useMotionTemplate
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
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
import Image from 'next/image';
import Link from 'next/link';
import { GITHUB, domain } from '~/config/constants';
import { usePathname } from 'next/navigation';
import { cn } from '~/lib/utils';
import { clamp } from '~/lib/math';
import {
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
	useUser
} from '@clerk/nextjs';

const fromScale = 1;
const toScale = 36 / 64;
const fromX = 0;
const toX = 2 / 16;
export function Header() {
	const isHomePage = usePathname() === '/';
	const headerRef = useRef<HTMLDivElement>(null);
	const avatarRef = useRef<HTMLDivElement>(null);
	const avatarScale = useMotionValue(1);
	const avatarX = useMotionValue(0);
	const avatarBorderX = useMotionValue(0);
	const avatarBorderScale = useMotionValue(1);
	const isInitial = useRef(true);
	useEffect(() => {
		const initial_avatar_offset = avatarRef.current?.offsetTop ?? 0;
		const upDelay = 64;
		function setProperty(property: string, value: string | null) {
			document.documentElement.style.setProperty(property, value);
		}

		function removeProperty(property: string) {
			document.documentElement.style.removeProperty(property);
		}

		function updateHeaderStyles() {
			if (!headerRef.current) {
				return;
			}

			const { top, height } = headerRef.current.getBoundingClientRect();
			const scrollY = clamp(
				window.scrollY,
				0,
				document.body.scrollHeight - window.innerHeight
			);
			if (isInitial.current) {
				setProperty('--header-position', 'sticky');
			}

			setProperty('--content-offset', `${initial_avatar_offset}px`);
			if (isInitial.current || scrollY < initial_avatar_offset) {
				setProperty('--header-height', `${initial_avatar_offset + height}px`);
				setProperty('--header-mb', `${-initial_avatar_offset}px`);
			} else if (top + height < -upDelay) {
				const offset = Math.max(height, scrollY - upDelay);
				setProperty('--header-height', `${offset}px`);
				setProperty('--header-mb', `${height - offset}px`);
			} else if (top === 0) {
				setProperty('--header-height', `${scrollY + height}px`);
				setProperty('--header-mb', `${-scrollY}px`);
			}

			if (top === 0 && scrollY > 0 && scrollY >= initial_avatar_offset) {
				setProperty('--header-inner-position', 'fixed');
				removeProperty('--header-top');
				removeProperty('--avatar-top');
			} else {
				removeProperty('--header-inner-position');
				setProperty('--header-top', '0px');
				setProperty('--avatar-top', '0px');
			}
		}

		function updateAvatarStyle() {
			if (!isHomePage) {
				return;
			}

			let scrollY = initial_avatar_offset - window.scrollY;
			let scale =
				(scrollY * (fromScale - toScale)) / initial_avatar_offset + toScale;
			scale = clamp(scale, fromScale, toScale);
			let x = (scrollY * (fromX - toX)) / initial_avatar_offset + toX;
			x = clamp(x, fromX, toX);
			avatarScale.set(scale);
			avatarX.set(x);

			const borderScale = 1 / (toScale / scale);

			avatarBorderX.set((-toX + x) * borderScale);
			avatarBorderScale.set(borderScale);
			setProperty('--avatar-border-opacity', scale === toScale ? '1' : '0');
		}

		function updateStyles() {
			updateHeaderStyles();
			updateAvatarStyle();
			isInitial.current = false;
		}
		updateStyles();

		window.addEventListener('scroll', updateStyles, { passive: true });
		window.addEventListener('resize', updateStyles);

		return () => {
			window.removeEventListener('scroll', updateStyles);
			window.removeEventListener('resize', updateStyles);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isHomePage]);

	const avatarTransform = useMotionTemplate`translate3d(${avatarX}rem, 0, 0) scale(${avatarScale})`;
	const avatarBorderTransform = useMotionTemplate`translate3d(${avatarBorderX}rem, 0, 0) scale(${avatarBorderScale})`;
	return (
		<>
			<motion.header
				className={cn(
					'relative w-full z-50 flex flex-col mb-[var(--header-mb,0px)]',
					isHomePage
						? 'h-[var(--header-height,180px)]'
						: 'h-[var(--header-height,64px)]'
				)}
				layout
				layoutRoot
			>
				<AnimatePresence>
					{isHomePage && (
						<>
							<div
								ref={avatarRef}
								className="order-last mt-[calc(theme(spacing.32)-theme(spacing.3))]"
							/>
							<Container
								className="top-0 -mb-3 order-last pt-3"
								style={{
									position:
										'var(--header-position)' as React.CSSProperties['position']
								}}
							>
								<motion.div
									initial={{ opacity: 0, y: 15 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										type: 'spring',
										damping: 30,
										stiffness: 200
									}}
									className="top-[var(--avatar-top,theme(spacing.3))] w-full"
									style={{
										position:
											'var(--header-inner-position)' as React.CSSProperties['position']
									}}
								>
									<motion.div
										layout
										layoutId="avatar"
										className="relative inline-flex"
									>
										<motion.div
											className="absolute left-0 mt-3 origin-left opacity-[var(--avatar-border-opacity,0)] transition-opacity"
											style={{
												transform: avatarBorderTransform
											}}
										>
											<div className="h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10"></div>
										</motion.div>
										<motion.div
											className="h-16 w-16 origin-left block relative select-none"
											style={{ transform: avatarTransform }}
										>
											<Image
												className="rounded-full bg-zinc-100 object-cover dark:bg-zinc-800 w-full h-full"
												src={GITHUB.DEFAULLT_AVATAR}
												alt={GITHUB.DEFAULLT_NAME}
												width={64}
												height={64}
												priority
											></Image>
										</motion.div>
									</motion.div>
								</motion.div>
							</Container>
						</>
					)}
				</AnimatePresence>

				<div
					ref={headerRef}
					className="top-0 h-16 pt-6 z-50"
					style={{
						position:
							'var(--header-position)' as React.CSSProperties['position']
					}}
				>
					<Container
						className="top-[var(--header-top,theme(spacing.6))] w-full"
						style={{
							position:
								'var(--header-inner-position)' as React.CSSProperties['position']
						}}
					>
						<div className="relative flex gap-4">
							<div className="flex-1 flex">
								<motion.div
									className="flex flex-1"
									initial={{ opacity: 0, y: 15 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										type: 'spring',
										damping: 30,
										stiffness: 200
									}}
								>
									<AnimatePresence>
										{!isHomePage && (
											<motion.div
												className="relative inline-flex"
												layoutId="avatar"
												layout
											>
												<div className="h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10  select-none">
													<Image
														className="rounded-full bg-zinc-100 object-cover dark:bg-zinc-800 w-full h-full"
														src={GITHUB.DEFAULLT_AVATAR}
														alt={GITHUB.DEFAULLT_NAME}
														width={40}
														height={40}
														priority
													></Image>
												</div>
											</motion.div>
										)}
									</AnimatePresence>
								</motion.div>
							</div>
							<div className="flex-1 flex justify-end md:justify-center">
								<Navigation.Mobile className="pointer-events-auto relative z-50 md:hidden" />
								<Navigation.Desktop className="pointer-events-auto relative z-50 hidden md:block" />
							</div>
							<motion.div
								initial={{ opacity: 0, y: -20, scale: 0.95 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								className="flex gap-3 justify-end md:flex-1"
							>
								<UserInfo />
								<ThemeSwither />
							</motion.div>
						</div>
					</Container>
				</div>
			</motion.header>
			{isHomePage && <div className="h-[--content-offset]" />}
		</>
	);
}

function UserInfo() {
	const [tooltipOpen, setTooltipOpen] = useState(false);
	const { user } = useUser();
	return (
		<AnimatePresence>
			<SignedIn key="user-info">
				<motion.div
					className="pointer-events-auto relative flex h-10 items-center"
					initial={{ opacity: 0, x: 25 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: 25 }}
				>
					<UserButton
						appearance={{
							elements: { avatarBox: 'w-9 h-9 ring-2 ring-white/20' }
						}}
					/>
				</motion.div>
			</SignedIn>
			<SignedOut key="sign-in">
				<motion.div
					className="pointer-events-auto"
					initial={{ opacity: 0, x: 25 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: 25 }}
				>
					<Tooltip.Provider delayDuration={400}>
						<Tooltip.Root open={tooltipOpen} onOpenChange={setTooltipOpen}>
							<SignInButton mode="modal">
								<Tooltip.Trigger asChild>
									<motion.button
										initial={{ opacity: 0, y: -15 }}
										animate={{ opacity: 1, y: 0 }}
										className="group h-10 flex items-center rounded-full bg-gradient-to-b from-zinc-50/20 to-white/80 px-3 text-xl font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md focus:outline-none focus-visible:ring-2 dark:from-zinc-900/30 dark:to-zinc-800/80 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20 dark:focus-visible:ring-yellow-500/80"
										type="button"
									>
										<UserArrowLeftIcon />
									</motion.button>
								</Tooltip.Trigger>
							</SignInButton>
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
				</motion.div>
			</SignedOut>
		</AnimatePresence>
	);
}

function UserSignInButton() {
	const [tooltipOpen, setTooltipOpen] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	return (
		<Tooltip.Provider delayDuration={400}>
			<Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
				<Tooltip.Root open={tooltipOpen} onOpenChange={setTooltipOpen}>
					<Tooltip.Trigger asChild>
						<Dialog.Trigger asChild>
							<motion.button
								initial={{ opacity: 0, y: -15 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.1 }}
								className="group h-10 flex items-center rounded-full bg-gradient-to-b from-zinc-50/20 to-white/80 px-3 text-xl font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md focus:outline-none focus-visible:ring-2 dark:from-zinc-900/30 dark:to-zinc-800/80 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20 dark:focus-visible:ring-yellow-500/80"
								aria-expanded={false}
								type="button"
							>
								<UserArrowLeftIcon />
							</motion.button>
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
						type="button"
						onClick={() => setTheme(theme !== 'dark' ? 'dark' : 'light')}
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
