import { ReactNode } from 'react';
import { cn } from '~/lib/utils';

export function StickyHeader({
	children,
	className
}: {
	children?: ReactNode;
	className?: string;
}) {
	return (
		<div className={cn('sticky z-10 top-2 backdrop-blur-xl', className)}>
			{children}
		</div>
	);
}
