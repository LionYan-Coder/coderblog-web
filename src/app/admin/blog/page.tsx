import { Metadata } from 'next';
import { DataTable } from '~/app/admin/blog/data-table';
import { columns } from '~/app/admin/blog/columns';
import { fetchArticleList } from '~/app/admin/blog/api';
import { Button } from '~/components/ui';
import { PlusIcon } from '~/assets';
import Link from 'next/link';
import { SEOMeta } from '~/config/meta';

export const metadata: Metadata = SEOMeta['blog'];

export default async function Page() {
	const res = await fetchArticleList();
	return (
		<div>
			<div className="flex justify-end mb-2">
				<Link href={'/admin/blog/0'}>
					<Button size="sm">
						<PlusIcon className="mr-2 text-base" />
						新建博客
					</Button>
				</Link>
			</div>
			<DataTable columns={columns} data={res?.list || []}></DataTable>
		</div>
	);
}
