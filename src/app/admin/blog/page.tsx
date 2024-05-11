import { Metadata } from 'next';
import { DataTable } from '~/app/admin/blog/data-table';
import { Button } from '~/components/ui';
import { PlusIcon } from '~/assets';
import Link from 'next/link';
import { SEOMeta } from '~/config/meta';

export const metadata: Metadata = SEOMeta['blog'];

export default function Page() {
	return (
		<div>
			<div className="flex justify-end mb-2">
				<Link href={'/admin/blog/0'}>
					<Button>
						<PlusIcon className="mr-2 text-base" />
						新建博客
					</Button>
				</Link>
			</div>
			<DataTable />
		</div>
	);
}
