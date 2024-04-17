'use client';
import Link from 'next/link';
import Image from 'next/image';
import { GITHUB } from '~/config/constants';
import { Tooltip } from '~/components/ui';
import { ThemeSwitcher } from '~/app/_components/ThemeSwitcher';
import * as React from 'react';
import type { ReactNode } from 'react';
import {
	DashboardIcon,
	MailboxIcon,
	NotebookIcon,
	RSSIcon,
	SettingIcon
} from '~/assets';
import { cn } from '~/lib/utils';
import { usePathname } from 'next/navigation';

export interface IMenu {
	label: string;
	icon: ReactNode;
	link: string;
	suffix?: ReactNode;
}

export const CommonMenus: IMenu[] = [
	{ label: '数据看板', icon: <DashboardIcon />, link: '/admin/dashboard' },
	{ label: '博客管理', icon: <RSSIcon />, link: '/admin/blog' },
	{ label: '笔记管理', icon: <NotebookIcon />, link: '/admin/notebook' },
	{ label: '留言管理', icon: <MailboxIcon />, link: '/admin/mailbox' }
];

export const SettingMenu: IMenu = {
	label: '后台设置',
	icon: <SettingIcon />,
	link: '/admin/setting',
	suffix: <ThemeSwitcher />
};

export function Sidebar() {
	const pathname = usePathname();
	return (
		<aside className="fixed inset-y-0 left-0 w-14 bg-background border-r hidden flex-col sm:flex">
			<nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
				<Link href="#">
					<Image
						className="rounded-full bg-zinc-100 object-cover dark:bg-zinc-800"
						src={GITHUB.DEFAULLT_AVATAR}
						alt={GITHUB.DEFAULLT_NAME}
						width={32}
						height={32}
						priority
					></Image>
				</Link>
				{CommonMenus.map((menu) => (
					<Tooltip.Provider delayDuration={100} key={menu.link}>
						<Tooltip.Root>
							<Tooltip.Trigger asChild>
								<Link
									href={menu.link}
									className={cn(
										'w-9 h-9 md:w-8 md:h-8 text-xl transition-colors text-muted-foreground hover:text-foreground bg-transparent rounded-lg flex items-center justify-center',
										pathname === menu.link && 'bg-accent text-foreground'
									)}
								>
									{menu.icon}
									<span className="sr-only">{menu.label}</span>
								</Link>
							</Tooltip.Trigger>
							<Tooltip.Content custom={false} side="right">
								{menu.label}
							</Tooltip.Content>
						</Tooltip.Root>
					</Tooltip.Provider>
				))}
			</nav>
			<nav className="mt-auto flex flex-col items-center justify-end gap-4 px-2 sm:py-4">
				<Tooltip.Provider delayDuration={100}>
					<Tooltip.Root>
						<Tooltip.Trigger asChild>
							<Link
								href={SettingMenu.link}
								className={cn(
									'w-9 h-9 md:w-8 md:h-8 text-xl transition-colors text-muted-foreground hover:text-foreground bg-transparent rounded-lg flex items-center justify-center',
									pathname === SettingMenu.link && 'bg-accent text-foreground'
								)}
							>
								{SettingMenu.icon}
								<span className="sr-only">{SettingMenu.label}</span>
							</Link>
						</Tooltip.Trigger>
						<Tooltip.Content custom={false} side="right">
							{SettingMenu.label}
						</Tooltip.Content>
					</Tooltip.Root>
				</Tooltip.Provider>
				<ThemeSwitcher side="right" className="h-8 w-8 px-0 text-base" />
			</nav>
		</aside>
	);
}
