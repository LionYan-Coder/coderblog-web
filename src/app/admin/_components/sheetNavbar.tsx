'use client';
import { Button, Sheet } from '~/components/ui';
import { PannelLeftIcon } from '~/assets';
import Link from 'next/link';
import Image from 'next/image';
import { GITHUB } from '~/config/constants';
import * as React from 'react';
import {
	SettingMenus,
	CommonMenus
} from '~/app/admin/_components/ResizableLayout';

export function SheetNavbar() {
	return (
		<Sheet>
			<Sheet.Trigger asChild>
				<Button variant="outline" size="icon" className="sm:hidden">
					<PannelLeftIcon className="h-5 w-5" />
					<span className="sr-only">Toggle Menu</span>
				</Button>
			</Sheet.Trigger>
			<Sheet.Content side="left">
				<nav className="grid gap-6 text-lg font-medium">
					<Link href="#" className="mb-5">
						<Image
							className="rounded-full bg-zinc-100 object-cover dark:bg-zinc-800"
							src={GITHUB.DEFAULT_AVATAR}
							alt={GITHUB.DEFAULT_NAME}
							width={64}
							height={64}
							priority
						></Image>
					</Link>
					{[...CommonMenus, ...SettingMenus].map((menu) => (
						<div key={menu.link} className="flex justify-between">
							<Link
								href={menu.link}
								className="flex flex-1 items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
							>
								{menu.icon}
								{menu.label}
							</Link>
							{menu.suffix}
						</div>
					))}
				</nav>
			</Sheet.Content>
		</Sheet>
	);
}
