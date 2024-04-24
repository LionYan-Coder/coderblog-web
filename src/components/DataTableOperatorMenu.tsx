'use client';
import { AlertDialog, Button, DropdownMenu } from '~/components/ui';
import {
	ArrowUpToLineIcon,
	CircleAlertIcon,
	EllipsisIcon,
	LoaderCircleIcon,
	PencilSwooshIcon,
	TrashIcon
} from '~/assets';
import { useState } from 'react';
import { isAsyncFunc } from '~/lib/is';

interface DataTableOperatorDropdownMenuProps<T> {
	row: T;
	editText?: string;
	publishText?: {
		published: string;
		unpublished: string;
	};
	deleteText?: string;
	onCancel?: () => void;
	onConfirm?: (row: T) => Promise<boolean>;
	onEdit?: (row: T) => void;
	onPublish?: (row: T) => Promise<void>;
	onUnPublish?: (row: T) => Promise<void>;
}
export function DataTableOperatorDropdownMenu<T extends TableBaseInfo>({
	row,
	editText = '编辑数据',
	publishText = {
		published: '发布数据',
		unpublished: '撤销数据'
	},
	deleteText = '删除数据',
	onCancel,
	onConfirm,
	onEdit,
	onPublish,
	onUnPublish
}: DataTableOperatorDropdownMenuProps<T>) {
	const { published } = row;
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	function handleCancel() {
		setOpen(false);
		onCancel?.();
	}

	function handleConfirm() {
		if (onConfirm && isAsyncFunc(onConfirm)) {
			setLoading(true);
			onConfirm?.(row)
				.then((b) => {
					if (b) {
						setOpen(false);
					}
				})
				.finally(() => setLoading(false));
		} else {
			setOpen(false);
			onConfirm?.(row);
		}
	}
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<DropdownMenu>
				<DropdownMenu.Trigger asChild>
					<Button variant="ghost" size="icon">
						<EllipsisIcon className="text-xl" />
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Label>数据操作</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Group>
						<DropdownMenu.Item
							onSelect={() => onEdit?.(row)}
							className="flex justify-between"
						>
							{editText}
							<PencilSwooshIcon />
						</DropdownMenu.Item>
						<DropdownMenu.Item
							onSelect={() =>
								published ? onUnPublish?.(row) : onPublish?.(row)
							}
							className="flex justify-between text-success focus:text-green-800 dark:focus:text-green-500"
						>
							{published ? publishText?.unpublished : publishText?.published}
							<ArrowUpToLineIcon />
						</DropdownMenu.Item>
					</DropdownMenu.Group>
					<DropdownMenu.Separator />
					<DropdownMenu.Group>
						<AlertDialog.Trigger asChild>
							<DropdownMenu.Item className="flex justify-between text-destructive focus:text-red-700">
								{deleteText}
								<TrashIcon />
							</DropdownMenu.Item>
						</AlertDialog.Trigger>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu>
			<AlertDialog.Content>
				<div className="grid gap-4">
					<div className="space-y-2">
						<h4 className="font-medium leading-none flex items-center">
							{deleteText}
							<CircleAlertIcon className="text-warning text-lg ml-2" />
						</h4>
						<p className="text-sm text-muted-foreground">确定删除此数据吗？</p>
					</div>
					<div className="flex justify-end space-x-2">
						<Button variant="secondary" onClick={handleCancel}>
							取消
						</Button>
						<Button variant="destructive" onClick={handleConfirm}>
							{loading && (
								<LoaderCircleIcon className="text-base animate-spin mr-2" />
							)}
							确认删除
						</Button>
					</div>
				</div>
			</AlertDialog.Content>
		</AlertDialog>
	);
}
