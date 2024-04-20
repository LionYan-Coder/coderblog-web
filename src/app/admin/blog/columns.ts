'use client';
import { ColumnDef } from '@tanstack/table-core';

export const columns: ColumnDef<Article>[] = [
	{ accessorKey: 'id', header: 'ID' },
	{ accessorKey: 'author', header: '作者' },
	{ accessorKey: 'coverUrl', header: '封面' },
	{ accessorKey: 'title', header: '标题' },
	{ accessorKey: 'summary', header: '概要' },
	{ accessorKey: 'tags', header: '标签' },
	{ accessorKey: 'createAt', header: '创建时间' },
	{ accessorKey: 'updateAt', header: '更新时间' }
];
