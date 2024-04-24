'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '~/lib/utils';

const { Provider, Root, Trigger, Portal } = TooltipPrimitive;

const TooltipContent = React.forwardRef<
	React.ElementRef<typeof TooltipPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
		custom?: boolean;
	}
>(({ className, sideOffset = 4, custom = true, ...props }, ref) => (
	<TooltipPrimitive.Content
		ref={ref}
		sideOffset={sideOffset}
		className={cn(
			'z-50 overflow-hidden rounded-md px-3 py-1.5 text-sm',
			custom
				? 'font-medium bg-gradient-to-b from-zinc-50/50 to-white/95 text-zinc-900 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:from-zinc-900/50 dark:to-zinc-800/95 dark:text-zinc-200 dark:ring-white/10'
				: 'text-primary-foreground bg-primary',
			!custom &&
				'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
			className
		)}
		{...props}
	/>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export const Tooltip = Object.assign(Root, {
	Provider,
	Root,
	Trigger,
	Content: TooltipContent,
	Portal
});
