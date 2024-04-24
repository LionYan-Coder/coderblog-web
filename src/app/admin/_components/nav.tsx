'use client';
import Link from 'next/link';
import { buttonVariants, Tooltip } from '~/components/ui';
import * as React from 'react';
import { cn } from '~/lib/utils';
import { usePathname } from 'next/navigation';
import { IMenu } from '~/app/admin/_components/ResizableLayout';

export function Nav({
	isCollapsed,
	menus
}: {
	isCollapsed: boolean;
	menus: IMenu[];
}) {
	const pathname = usePathname();
	return (
		<div
			data-collapsed={isCollapsed}
			className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
		>
			<nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
				{menus.map((menu) =>
					isCollapsed ? (
						<Tooltip.Provider key={menu.link} delayDuration={0}>
							<Tooltip>
								<Tooltip.Trigger asChild>
									<Link
										href={menu.link}
										className={cn(
											buttonVariants({
												variant: pathname.includes(menu.link)
													? 'default'
													: 'ghost',
												size: 'icon'
											}),
											'h-9 w-9',
											pathname.includes(menu.link) &&
												'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white'
										)}
									>
										<span className="text-base">{menu.icon}</span>
										<span className="sr-only">{menu.label}</span>
									</Link>
								</Tooltip.Trigger>
								<Tooltip.Content
									side="right"
									className="flex items-center gap-4"
									custom={false}
								>
									{menu.label}
								</Tooltip.Content>
							</Tooltip>
						</Tooltip.Provider>
					) : (
						<Link
							key={menu.link}
							href={menu.link}
							className={cn(
								buttonVariants({
									variant: pathname.includes(menu.link) ? 'default' : 'ghost'
								}),
								pathname.includes(menu.link) &&
									'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
								'justify-start'
							)}
						>
							<span className="text-base mr-2">{menu.icon}</span>
							{menu.label}
						</Link>
					)
				)}
			</nav>
		</div>
	);
}
