'use client';
import { Breadcrumb } from '~/components/ui';
import { HomeIcon } from '~/assets';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { SEOMeta } from '~/config/meta';

type HistoryStateTree = string | { children: HistoryStateTree[] };

export function HeaderBreadcrumb() {
	const pathname = usePathname();
	const [pageTitle, setPageTitle] = useState('');
	const [historyPaths, setHistoryPaths] = useState<any[]>([]);
	useEffect(() => {
		const historyPaths =
			history.state.__PRIVATE_NEXTJS_INTERNALS_TREE[1].children.filter(
				(v: HistoryStateTree) => v != 'admin'
			)[0].children;
		setHistoryPaths(historyPaths);
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
				{historyPaths.length > 0 &&
					historyPaths[historyPaths.length - 1].children[0] !== '__PAGE__' && (
						<>
							<Breadcrumb.Item>
								<Breadcrumb.Link href={'/admin/' + historyPaths[0]}>
									{SEOMeta[historyPaths[0] as string].title}
								</Breadcrumb.Link>
							</Breadcrumb.Item>
							<Breadcrumb.Separator />
						</>
					)}

				<Breadcrumb.Page>
					<Breadcrumb.Link href="#">{pageTitle}</Breadcrumb.Link>
				</Breadcrumb.Page>
			</Breadcrumb.List>
		</Breadcrumb>
	);
}
