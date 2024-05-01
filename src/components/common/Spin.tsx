'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { cn } from '~/lib/utils';
import { LoaderCircleIcon } from '~/assets';
import { cva } from 'class-variance-authority';

export interface SpinProps {
	spinning?: boolean;
	children?: ReactNode;
	tip?: ReactNode;
	indicator?: ReactNode;
	delay?: number;
	size?: 'small' | 'medium' | 'large';
	className?: string;
}

const SpinVariants = cva('text-success', {
	variants: {
		size: {
			small: 'text-base',
			medium: 'text-2xl',
			large: 'text-3xl'
		}
	},
	defaultVariants: {
		size: 'medium'
	}
});

export function Spin({
	spinning = true,
	size,
	delay = 0,
	indicator,
	tip,
	children,
	className
}: SpinProps) {
	const [controllerSpin, setControllerSpin] = useState(spinning);

	useEffect(() => {
		setControllerSpin(spinning);
	}, [spinning]);

	const loader = useMemo(() => {
		return indicator ?? <LoaderCircleIcon className="animate-spin" />;
	}, [indicator]);

	return (
		<div className={cn('relative w-full h-full', className)}>
			<AnimatePresence>
				{controllerSpin && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.5 }}
						exit={{ opacity: 0 }}
						transition={{ delay }}
						className="absolute bg-primary-foreground w-full h-full flex flex-col justify-center items-center space-y-4"
					>
						<span className={SpinVariants({ size: size })}>{loader}</span>
						{tip}
					</motion.div>
				)}
			</AnimatePresence>

			{children}
		</div>
	);
}
