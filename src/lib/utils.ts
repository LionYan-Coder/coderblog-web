import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Column } from '@tanstack/table-core';
import { CSSProperties } from 'react';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getCommonPinningClass = <T = any>(column: Column<T>) => {
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

export const getCommonPinningStyles = <T = any>(
	column: Column<T>
): CSSProperties => {
	const isPinned = column.getIsPinned();
	return {
		left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
		right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
		position: isPinned ? 'sticky' : 'relative',
		width: isPinned ? column.getSize() : 'inherit',
		zIndex: isPinned ? 1 : 0
	};
};
