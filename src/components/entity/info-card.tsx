import { Card } from '~/components/ui';

interface EntityInfo {
	createAt?: string;
	updateAt?: string;
	author?: string;
}

interface EntityInfoCardProps {
	entity?: EntityInfo;
}

export function InfoCard({ entity }: EntityInfoCardProps) {
	return (
		<Card>
			<Card.Header>
				<Card.Title>基础信息</Card.Title>
				<Card.Description>操作时间和操作人的信息</Card.Description>
			</Card.Header>
			<Card.Content className="flex flex-col gap-2 text-sm">
				<div className="flex justify-between items-center gap-2">
					<span>创建时间</span>
					<span className="text-muted-foreground">
						{entity?.createAt ?? '现在'}
					</span>
				</div>
				<div className="flex justify-between items-center gap-2">
					<span>上次更新</span>
					<span className="text-muted-foreground">
						{entity?.updateAt ?? '现在'}
					</span>
				</div>
				<div className="flex justify-between items-center gap-2">
					<span>操作人</span>
					<span className="text-muted-foreground">{entity?.author ?? '-'}</span>
				</div>
			</Card.Content>
		</Card>
	);
}
