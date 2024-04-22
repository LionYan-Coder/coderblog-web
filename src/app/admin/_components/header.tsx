import { SheetNavbar } from '~/app/admin/_components/sheetNavbar';
import { HeaderBreadcrumb } from '~/app/admin/_components/headerBreadcrumb';
import { SearchIcon } from '~/assets';
import { Input } from '~/components/ui';
import { UserInfo } from '~/app/_components/UserInfo';
import * as React from 'react';
import { ClientOnly } from '~/components';

export function Header() {
	return (
		<header className="sticky top-0 z-10 h-14 border-b bg-background flex items-center gap-4 px-4 sm:static sm:px-6 sm:h-auto sm:border-transparent sm:bg-transparent transition-colors">
			<SheetNavbar />
			<ClientOnly>
				<HeaderBreadcrumb />
			</ClientOnly>

			<div className="relative flex-1 ml-auto sm:grow-0">
				<SearchIcon className="absolute text-muted-foreground left-2.5 top-2.5" />
				<Input
					type="search"
					placeholder="Search..."
					className="rounded-lg sm:w-[200px] md:w-[280px] lg:w-[320px] bg-background pl-8"
				/>
			</div>
			<UserInfo />
		</header>
	);
}
