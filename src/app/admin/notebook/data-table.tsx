'use client';

import { getCoreRowModel, getPaginationRowModel } from '@tanstack/table-core';
import { flexRender, useReactTable } from '@tanstack/react-table';
import { Empty, Table, TablePagination, Skeleton } from '~/components';
import { useColumns } from '~/app/admin/notebook/columns';
import { useEffect, useState } from 'react';
import { cn, getCommonPinningClass, getCommonPinningStyles } from '~/lib/utils';
import { useNotebookApi } from '~/app/admin/notebook/useNotebookApi';

export function DataTable() {
	const { fetchNotebookList } = useNotebookApi();

	const [loading, setLoading] = useState<boolean>(true);
	const [tableData, setTableData] = useState<Notebook[]>([]);
	const { columns } = useColumns({ refresh: getData });
	const table = useReactTable<Notebook>({
		data: tableData,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		state: {
			columnPinning: {
				right: ['operator']
			}
		},
		debugTable: true
	});

	async function getData() {
		setLoading(true);
		const { list, total, page } = await fetchNotebookList().finally(() =>
			setLoading(false)
		);
		setTableData(list || []);
	}

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="rounded-md border bg-background">
			<Table>
				<Table.Header>
					{table.getHeaderGroups().map((headerGroup) => (
						<Table.Row key={'group' + headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<Table.Head
									key={header.id}
									style={getCommonPinningStyles(header.column)}
									className={getCommonPinningClass(header.column)}
								>
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
									key={'row' + row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<Table.Cell
											key={cell.id}
											style={getCommonPinningStyles(cell.column)}
											className={getCommonPinningClass(cell.column)}
										>
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
							<Table.Row key="empty">
								<Table.Cell
									key="emptycell"
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
							<Table.Row key={'placeholder' + index}>
								{columns.map((column) => (
									<Table.Cell key={column.id}>
										<Skeleton className={cn('h-6')} />
									</Table.Cell>
								))}
							</Table.Row>
						))}
					</Table.Body>
				)}
			</Table>
			<TablePagination table={table} />
		</div>
	);
}
