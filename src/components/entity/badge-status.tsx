import { Badge } from '~/components/ui';
export function BadgeStatus({
	published,
	className
}: {
	published?: boolean;
	className?: string;
}) {
	return (
		<Badge className={className} variant={published ? 'success' : 'outline'}>
			{published ? 'Published' : 'Unpublish'}
		</Badge>
	);
}
