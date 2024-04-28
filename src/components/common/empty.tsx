import { ReactNode } from 'react';
import { cn } from '~/lib/utils';
import { EmptyIcon } from '~/assets';

export function Empty({
	children,
	className
}: {
	children?: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				'flex flex-col space-y-2 justify-center items-center text-muted-foreground',
				className
			)}
		>
			<EmptyIcon className="w-9 h-9" />
			{children ? children : <p>暂无数据</p>}
		</div>
	);
}
