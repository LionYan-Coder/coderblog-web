import {
	ChevronLeftIcon,
	ChevronRightIcon,
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon
} from '~/assets';
import { Table } from '@tanstack/react-table';
import { Button, Select } from '~/components/ui';

interface DataTablePaginationProps<TData> {
	table: Table<TData>;
}

export function TablePagination<TData>({
	table
}: DataTablePaginationProps<TData>) {
	return (
		<div className="bg-muted/40 flex items-center justify-between py-3 px-6 space-x-4 border-t">
			<div className="flex items-center space-x-4 lg:space-x-6">
				<div className="flex items-center text-sm font-medium">
					{table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
				</div>
				<div className="flex items-center space-x-2">
					<Button
						key="previous1"
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
					>
						<span className="sr-only">Go to first page</span>
						<DoubleArrowLeftIcon className="h-4 w-4" />
					</Button>
					<Button
						key="previous2"
						variant="outline"
						className="h-8 w-8 p-0"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<span className="sr-only">Go to previous page</span>
						<ChevronLeftIcon className="h-4 w-4" />
					</Button>
					<Button
						key="next1"
						variant="outline"
						className="h-8 w-8 p-0"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<span className="sr-only">Go to next page</span>
						<ChevronRightIcon className="h-4 w-4" />
					</Button>
					<Button
						key="next2"
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={() => table.setPageIndex(table.getPageCount() - 1)}
						disabled={!table.getCanNextPage()}
					>
						<span className="sr-only">Go to last page</span>
						<DoubleArrowRightIcon className="h-4 w-4" />
					</Button>
				</div>
				<div className="flex items-center space-x-2">
					<p className="text-sm font-medium">page</p>
					<Select
						value={`${table.getState().pagination.pageSize}`}
						onValueChange={(value) => {
							table.setPageSize(Number(value));
						}}
					>
						<Select.Trigger className="h-8 w-[70px]">
							<Select.Value
								placeholder={table.getState().pagination.pageSize}
							/>
						</Select.Trigger>
						<Select.Content side="top">
							{[10, 20, 30, 40, 50].map((pageSize) => (
								<Select.Item key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</Select.Item>
							))}
						</Select.Content>
					</Select>
				</div>
			</div>
			{table.getSelectedRowModel().rows.length > 0 && (
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} of{' '}
					{table.getFilteredRowModel().rows.length} selected
				</div>
			)}
		</div>
	);
}
