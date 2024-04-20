import { Metadata } from 'next';
import { DataTable } from '~/app/admin/blog/data-table';
import { columns } from '~/app/admin/blog/columns';
import { fetchArticleList } from '~/app/admin/blog/api';

export const metadata: Metadata = {
	title: '博客管理'
};

export default async function Page() {
	const res = await fetchArticleList();
	return (
		<div>
			<DataTable columns={columns} data={res?.list || []}></DataTable>
		</div>
	);
}
