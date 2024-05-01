'use client';

import {
	Column,
	getCoreRowModel,
	getPaginationRowModel
} from '@tanstack/table-core';
import { flexRender, useReactTable } from '@tanstack/react-table';
import { Empty, Table, TablePagination, Skeleton } from '~/components';
import { useColumns } from '~/app/admin/blog/columns';
import { CSSProperties, useEffect, useState } from 'react';
import { useHttp } from '~/http';
import { cn } from '~/lib/utils';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const getCommonPinningClass = <T = any,>(column: Column<T>) => {
	const isPinned = column.getIsPinned();
	const isLastLeftPinnedColumn =
		isPinned === 'left' && column.getIsLastColumn('left');
	const isFirstRightPinnedColumn =
		isPinned === 'right' && column.getIsFirstColumn('right');

	return twMerge(
		clsx(
			isLastLeftPinnedColumn &&
				'after:shadow-table-left after:right-0 after:translate-x-full',
			isFirstRightPinnedColumn &&
				'after:shadow-table-right after:left-0 after:-translate-x-full',
			// isPinned && 'transition-colors bg-background group-hover:bg-muted/50',
			isPinned
				? 'after:content-[""] after:absolute after:top-0 after:bottom-0 after:w-[30px] after:pointer-events-auto'
				: 'truncate'
		)
	);
};

const getCommonPinningStyles = (column: Column<Article>): CSSProperties => {
	const isPinned = column.getIsPinned();
	return {
		left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
		right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
		position: isPinned ? 'sticky' : 'relative',
		width: isPinned ? column.getSize() : 'inherit',
		zIndex: isPinned ? 1 : 0
	};
};

export function DataTable() {
	const { fetchArticleList } = useHttp();

	const [loading, setLoading] = useState<boolean>(true);
	const [tableData, setTableData] = useState<Article[]>([]);
	const { columns } = useColumns({ refresh: getData });
	const table = useReactTable<Article>({
		data: tableData,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		state: {
			columnPinning: {
				right: ['operator']
			}
		}
	});

	async function getData() {
		setLoading(true);
		const { list, total, page } = await fetchArticleList().finally(() =>
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
