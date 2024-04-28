import { Button, Popover } from '~/components/ui';
import { Setting2Icon } from '~/assets';

export function OperatorHeader() {
	return (
		<Popover>
			<Popover.Trigger asChild>
				<Button size="icon" variant="ghost">
					<Setting2Icon className="text-lg" />
				</Button>
			</Popover.Trigger>
			<Popover.Content align="end">
				<p className="text-muted-foreground">待开发...</p>
			</Popover.Content>
		</Popover>
	);
}
