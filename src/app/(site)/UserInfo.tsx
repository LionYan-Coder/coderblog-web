import { useMemo, useState } from 'react';
import {
	SignedIn,
	SignedOut,
	SignInButton,
	UserButton,
	useUser
} from '@clerk/nextjs';
import {
	GitHubBrandIcon,
	GoogleBrandIcon,
	MailIcon,
	UserArrowLeftIcon
} from '~/assets';
import { AnimatePresence, motion } from 'framer-motion';
import { Tooltip } from '~/components/ui';

export function UserInfo() {
	const [tooltipOpen, setTooltipOpen] = useState(false);
	const { user } = useUser();

	const StrategyIcon = useMemo(() => {
		const strategy = user?.primaryEmailAddress?.verification.strategy;
		if (!strategy) return null;
		switch (strategy) {
			case 'from_oauth_github':
				return GitHubBrandIcon;
			case 'from_oauth_google':
				return GoogleBrandIcon;
			default:
				return MailIcon;
		}
	}, [user?.primaryEmailAddress?.verification.strategy]);

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
					{StrategyIcon && (
						<span className="pointer-events-none absolute -bottom-1 -right-1 flex h-4 w-4 select-none items-center justify-center rounded-full bg-white dark:bg-zinc-900">
							<StrategyIcon className="h-3 w-3" />
						</span>
					)}
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
