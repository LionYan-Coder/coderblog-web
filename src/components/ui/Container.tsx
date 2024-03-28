import { forwardRef, ComponentPropsWithoutRef } from 'react';
import { cn } from '~/lib/utils';

type ContainerProps = ComponentPropsWithoutRef<'div'>;
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
	function Container({ className, children, ...props }, ref) {
		return (
			<div ref={ref} className={cn('sm:px-8', className)} {...props}>
				<div className="mx-auto w-full max-w-7xl lg:px-8">
					<div className="relative px-4 sm:px-8 lg:px-12">
						<div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
					</div>
				</div>
			</div>
		);
	}
);

export default Container;
