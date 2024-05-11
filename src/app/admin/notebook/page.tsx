import Link from 'next/link';
import { Button } from '~/components';
import { PlusIcon } from '~/assets';
import { DataTable } from '~/app/admin/notebook/data-table';
import { Metadata } from 'next';
import { SEOMeta } from '~/config/meta';

export const metadata: Metadata = SEOMeta['notebook'];

export default function Page() {
	return (
		<div>
			<div className="flex justify-end mb-2">
				<Link href={'/admin/notebook/0'}>
					<Button>
						<PlusIcon className="mr-2 text-base" />
						新建笔记
					</Button>
				</Link>
			</div>
			<DataTable />
		</div>
	);
}
