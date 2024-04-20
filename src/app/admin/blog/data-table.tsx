'use client';

import {
	ColumnDef,
	getCoreRowModel,
	getPaginationRowModel
} from '@tanstack/table-core';
import { flexRender, useReactTable } from '@tanstack/react-table';
import { Table } from '~/components/ui';
import { DataTablePagination } from '~/components/DataTablePagination';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({
	columns,
	data
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel()
	});
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
				<Table.Body>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<Table.Row
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}
							>
								{row.getVisibleCells().map((cell) => (
									<Table.Cell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</Table.Cell>
								))}
							</Table.Row>
						))
					) : (
						<Table.Row>
							<Table.Cell colSpan={columns.length} className="h-24 text-center">
								No results.
							</Table.Cell>
						</Table.Row>
					)}
				</Table.Body>
			</Table>
			<DataTablePagination table={table} />
		</div>
	);
}
