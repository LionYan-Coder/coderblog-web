'use client';
import { CircleAlertIcon, LoaderCircleIcon, TrashIcon } from '~/assets';
import { Button, AlertDialog, type ButtonProps } from '../ui';
import { AlertDialogContentProps } from '@radix-ui/react-alert-dialog';
import { cn } from '~/lib/utils';
import { useState } from 'react';
import { isAsyncFunc } from '~/lib/is';

interface EntityDeleteButtonProps extends AlertDialogContentProps {
	buttonProps: ButtonProps;
	onCancel: () => void;
	onConfirm: () => Promise<boolean>;
}

export function EntityDeleteButton({
	buttonProps,
	className,
	children,
	onCancel,
	onConfirm,
	...rest
}: Partial<EntityDeleteButtonProps>) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	function handleCancel() {
		setOpen(false);
		onCancel?.();
	}

	function handleConfirm() {
		if (onConfirm && isAsyncFunc(onConfirm)) {
			setLoading(true);
			onConfirm?.()
				.then((b) => {
					if (b) {
						setOpen(false);
					}
				})
				.finally(() => setLoading(false));
		} else {
			setOpen(false);
			onConfirm?.();
		}
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialog.Trigger asChild>
				<Button variant="destructive" {...buttonProps}>
					<TrashIcon className="mr-2 text-base" />
					删除此数据
				</Button>
			</AlertDialog.Trigger>
			<AlertDialog.Content className={cn(className)} {...rest}>
				<div className="grid gap-4">
					<div className="space-y-2">
						<h4 className="font-medium leading-none flex items-center">
							删除数据
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
