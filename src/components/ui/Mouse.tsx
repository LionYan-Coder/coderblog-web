import { HTMLAttributes } from 'react';
import { cn } from '~/lib/utils';

export function Mouse({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				'w-[20px] h-[30px] md:w-[26px] md:h-[38px] rounded-full border-2 border-primary/30 relative grid justify-center pt-2',
				className
			)}
			{...props}
		>
			<div className="w-[2px] h-[5px] md:h-[7px] bg-primary/30  rounded-full animate-intro-scroll"></div>
		</div>
	);
}
