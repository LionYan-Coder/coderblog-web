'use client';

import {
	AnimatePresence,
	motion,
	useMotionTemplate,
	useMotionValue
} from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Container } from '~/components/ui';
import { Navigation } from './Navigation';
import Image from 'next/image';
import { GITHUB } from '~/config/constants';
import { usePathname } from 'next/navigation';
import { cn } from '~/lib/utils';
import { clamp } from '~/lib/math';
import { UserInfo } from '~/app/_components/UserInfo';
import { ThemeSwitcher } from '~/app/_components/ThemeSwitcher';

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
					'relative w-full z-10 flex flex-col mb-[var(--header-mb,0px)]',
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
								<ThemeSwitcher />
							</motion.div>
						</div>
					</Container>
				</div>
			</motion.header>
			{isHomePage && <div className="h-[--content-offset]" />}
		</>
	);
}
