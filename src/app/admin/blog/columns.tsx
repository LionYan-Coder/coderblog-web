'use client';
import { ColumnDef } from '@tanstack/table-core';
import Image from 'next/image';
import { Setting2Icon } from '~/assets';
import {
	Button,
	DataTableOperatorDropdownMenu,
	OperatorHeader,
	CardStatus,
	Popover
} from '~/components';
import { useHttp } from '~/http';
import { useRouter } from 'next/navigation';

export const useColumns = ({ refresh }: { refresh?: () => Promise<void> }) => {
	const router = useRouter();
	const { fetchDeleteArticle, fetchPublishArticle } = useHttp();

	async function handleDelete(row: Article) {
		await fetchDeleteArticle(row.id);
		refresh?.();
		return true;
	}

	async function handlePublish(row: Article, publish: boolean) {
		await fetchPublishArticle(row.id, publish);
		refresh?.();
	}

	const columns: ColumnDef<Article, any>[] = [
		{ accessorKey: 'id', header: 'ID' },
		{
			accessorKey: 'coverUrl',
			header: '封面',
			cell: (props) => (
				<Image
					src={props.getValue()}
					alt="封面"
					width={300}
					height={300}
					className="min-w-[300px] aspect-video h-40 object-cover"
				/>
			)
		},
		{
			accessorKey: 'title',
			header: '标题',
			cell: (props) => <p className="font-medium">{props.getValue()}</p>
		},
		{ accessorKey: 'summary', header: '概要' },
		{ accessorKey: 'tags', header: '标签' },
		{
			accessorKey: 'published',
			header: '状态',
			cell: (props) => (
				<CardStatus
					published={props.getValue()}
					publishedText="已发布"
					unPublishedText="草稿箱"
					dot={false}
					className="inline-flex px-2 py-1"
				/>
			)
		},
		{ accessorKey: 'author', header: '作者' },
		{
			accessorKey: 'timeAt',
			header: '操作时间',
			cell: (props) => {
				const { createAt, updateAt } = props.row.original;
				return (
					<div className="text-muted-foreground max-w-48">
						<p className="flex justify-between space-x-1">
							<span>create</span>
							<span>{createAt}</span>
						</p>
						<p className="flex justify-between space-x-1">
							<span>update</span>
							<span>{updateAt}</span>
						</p>
					</div>
				);
			}
		},
		{
			accessorKey: 'operator',
			header: ({ table }) => <OperatorHeader />,
			cell: (props) => (
				<DataTableOperatorDropdownMenu
					row={props.row.original}
					editText="编辑博客"
					deleteText="删除博客"
					publishText={{ published: '发布播客', unpublished: '撤销播客' }}
					onEdit={(row) => router.push(`/admin/blog/${row.id}`)}
					onConfirm={handleDelete}
					onPublish={(row) => handlePublish(row, true)}
					onUnPublish={(row) => handlePublish(row, false)}
				/>
			)
		}
	];

	return { columns };
};
