'use client';

import {
	AccessorKeyColumnDefBase,
	getCoreRowModel,
	getPaginationRowModel
} from '@tanstack/table-core';
import { flexRender, useReactTable } from '@tanstack/react-table';
import { Empty, Table, DataTablePagination, Skeleton } from '~/components';
import { useColumns } from '~/app/admin/blog/columns';
import { useEffect, useState } from 'react';
import { useHttp } from '~/http';
import { cn } from '~/lib/utils';

export function DataTable() {
	const { fetchArticleList } = useHttp();
	const [loading, setLoading] = useState<boolean>(true);
	const [tableData, setTableData] = useState<Article[]>([]);
	const { columns } = useColumns({ refresh: getData });
	const table = useReactTable<Article>({
		data: tableData,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel()
	});

	async function getData() {
		setLoading(true);
		const { list, total, page } = await fetchArticleList().finally(() =>
			setLoading(false)
		);
		setTableData(list);
	}

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="rounded-md border bg-background">
			<Table>
				<Table.Header>
					{table.getHeaderGroups().map((headerGroup) => (
						<Table.Row key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<Table.Head key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
								</Table.Head>
							))}
						</Table.Row>
					))}
				</Table.Header>
				{!loading ? (
					<Table.Body>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<Table.Row
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<Table.Cell key={cell.id}>
											{cell.getValue() !== ''
												? flexRender(
														cell.column.columnDef.cell,
														cell.getContext()
													)
												: '-'}
										</Table.Cell>
									))}
								</Table.Row>
							))
						) : (
							<Table.Row>
								<Table.Cell
									colSpan={columns.length}
									className="h-32 text-center"
								>
									<Empty />
								</Table.Cell>
							</Table.Row>
						)}
					</Table.Body>
				) : (
					<Table.Body>
						{Array.from({ length: 7 }, (_, index) => index).map((index) => (
							<Table.Row key={index}>
								{columns.map((column) => (
									<Table.Cell
										key={
											(column as AccessorKeyColumnDefBase<Article>).accessorKey
										}
									>
										<Skeleton
											className={cn(
												'w-[120px] h-6',
												(column as AccessorKeyColumnDefBase<Article>)
													.accessorKey === 'coverUrl' &&
													'aspect-video w-[300px]',
												(column as AccessorKeyColumnDefBase<Article>)
													.accessorKey === 'id' && 'w-8'
											)}
										/>
									</Table.Cell>
								))}
							</Table.Row>
						))}
					</Table.Body>
				)}
			</Table>
			<DataTablePagination table={table} />
		</div>
	);
}
