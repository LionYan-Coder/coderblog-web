'use client';
import { Breadcrumb } from '~/components/ui';
import { HomeIcon } from '~/assets';
import * as React from 'react';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function HeaderBreadcrumb() {
	const pathname = usePathname();
	const [pageTitle, setPageTitle] = React.useState('');
	useEffect(() => {
		setPageTitle(document.title);
	}, [pathname]);
	return (
		<Breadcrumb className="hidden sm:flex">
			<Breadcrumb.List>
				<Breadcrumb.Item>
					<Breadcrumb.Link href="#">
						<HomeIcon className="text-lg"></HomeIcon>
					</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
				<Breadcrumb.Page>
					<Breadcrumb.Link href={pathname}>{pageTitle}</Breadcrumb.Link>
				</Breadcrumb.Page>
			</Breadcrumb.List>
		</Breadcrumb>
	);
}
