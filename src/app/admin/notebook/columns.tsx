'use client';
import {
	DataTableOperatorDropdownMenu,
	OperatorHeader,
	CardStatus
} from '~/components';
import { useRouter } from 'next/navigation';
import { ColumnDef } from '@tanstack/table-core';
import Link from 'next/link';
import { useNotebookApi } from '~/app/admin/notebook/useNotebookApi';

export const useColumns = ({ refresh }: { refresh?: () => Promise<void> }) => {
	const router = useRouter();
	const { fetchDeleteNotebook, fetchPublishNotebook } = useNotebookApi();

	async function handleDelete(row: Notebook) {
		await fetchDeleteNotebook(row.id);
		refresh?.();
		return true;
	}

	async function handlePublish(row: Notebook, publish: boolean) {
		await fetchPublishNotebook(row.id, publish);
		refresh?.();
	}

	const columns: ColumnDef<Notebook>[] = [
		{ id: 'id', accessorKey: 'id', header: 'ID', size: 48 },
		{
			id: 'title',
			accessorKey: 'title',
			header: '标题',
			cell: (props) => (
				<Link
					href={`/admin/notebook/${props.row.original.id}`}
					className="font-medium hover:underline underline-offset-2"
				>
					{props.getValue<string>()}
				</Link>
			)
		},
		{ id: 'summary', accessorKey: 'summary', header: '概要' },
		{ id: 'tags', accessorKey: 'tags', header: '标签' },
		{
			id: 'published',
			accessorKey: 'published',
			header: '状态',
			cell: (props) => (
				<CardStatus
					published={props.getValue<boolean>()}
					publishedText="已发布"
					unPublishedText="草稿箱"
					dot={false}
					className="inline-flex px-2 py-1"
				/>
			)
		},
		{ id: 'author', accessorKey: 'author', header: '作者' },
		{
			id: 'timeAt',
			accessorKey: 'timeAt',
			header: '操作时间',
			cell: (props) => {
				const { createAt, updateAt } = props.row.original;
				return (
					<div className="text-muted-foreground max-w-48">
						<p className="flex justify-between space-x-1">
							<span>create</span>
							<span className="text-center">{createAt}</span>
						</p>
						<p className="flex justify-between space-x-1">
							<span>update</span>
							<span className="text-center">{updateAt}</span>
						</p>
					</div>
				);
			}
		},
		{
			id: 'operator',
			accessorKey: 'operator',
			size: 60,
			header: ({ table }) => <OperatorHeader />,
			cell: (props) => (
				<DataTableOperatorDropdownMenu
					row={props.row.original}
					editText="编辑博客"
					deleteText="删除博客"
					publishText={{ published: '发布播客', unpublished: '撤销播客' }}
					onEdit={(row) => router.push(`/admin/notebook/${row.id}`)}
					onConfirm={handleDelete}
					onPublish={(row) => handlePublish(row, true)}
					onUnPublish={(row) => handlePublish(row, false)}
				/>
			)
		}
	];

	return { columns };
};
