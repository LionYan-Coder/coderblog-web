'use client';
import { Button, Resizable, ResizableHandle, Separator } from '~/components';
import { Nav } from '~/app/admin/_components/nav';
import { Header } from '~/app/admin/_components/header';
import * as React from 'react';
import { ReactNode } from 'react';
import { cn } from '~/lib/utils';
import {
	DashboardIcon,
	MailboxIcon,
	NotebookIcon,
	RSSIcon,
	SettingIcon
} from '~/assets';
import { ThemeSwitcher } from '~/app/_components/ThemeSwitcher';
import Link from 'next/link';
import Image from 'next/image';
import { DOMAIN, GITHUB } from '~/config/constants';
interface Props {
	defaultLayout: number[] | undefined;
	defaultCollapsed?: boolean;
	navCollapsedSize: number;
	children?: ReactNode;
}

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

export const SettingMenus: IMenu[] = [
	{
		label: '后台设置',
		icon: <SettingIcon />,
		link: '/admin/setting',
		suffix: <ThemeSwitcher />
	}
];

export function ResizableLayout({
	children,
	defaultLayout = [265, 1095],
	defaultCollapsed = false,
	navCollapsedSize
}: Props) {
	const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

	return (
		<Resizable.PanelGroup
			direction="horizontal"
			className="min-h-screen w-full bg-muted/40"
			onLayout={(sizes: number[]) => {
				document.cookie = `react-resizable-panels:layout=${JSON.stringify(
					sizes
				)}`;
			}}
		>
			<Resizable.Panel
				defaultSize={defaultLayout[0]}
				collapsedSize={navCollapsedSize}
				collapsible={true}
				minSize={15}
				maxSize={17.5}
				onExpand={() => {
					setIsCollapsed(false);
					document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
						false
					)}`;
				}}
				onCollapse={() => {
					setIsCollapsed(true);
					document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
						true
					)}`;
				}}
				className={cn(
					'hidden sm:block relative h-screen overflow-y-hidden',
					isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out'
				)}
			>
				<div className="flex items-center h-[56px] px-2">
					<Button className="w-10 h-10 relative" size="icon" variant="outline">
						<Image
							className="h-full object-cover"
							src={GITHUB.DEFAULLT_AVATAR}
							alt={GITHUB.DEFAULLT_NAME}
							width={40}
							height={40}
							priority
						></Image>
					</Button>

					{!isCollapsed && (
						<span className="font-bold tracking-wide text-2xl shrink text-primary italic ml-4">
							{DOMAIN}
						</span>
					)}
				</div>
				<Separator />
				<Nav isCollapsed={isCollapsed} menus={CommonMenus} />
				<Separator />
				<Nav isCollapsed={isCollapsed} menus={SettingMenus} />
			</Resizable.Panel>
			<ResizableHandle className="hidden sm:flex h-screen" withHandle />

			<Resizable.Panel
				defaultSize={defaultLayout[1]}
				minSize={30}
				className="transition-all duration-300 ease-in-out h-screen !overflow-auto"
				id="content"
			>
				<div className="w-full flex flex-col">
					<Header />
					<main className="p-4">{children}</main>
				</div>
			</Resizable.Panel>
		</Resizable.PanelGroup>
	);
}
