import { EmptyIcon, TiltedSendIcon } from '~/assets';
import { Card } from '~/components/ui';

export default function FriendLink() {
	return (
		<div className="lg:pl-16 xl:pl-32 space-y-10 mt-10 lg:mt-0 md:py-4">
			<Card className="shadow-none bg-inherit rounded-2xl">
				<Card.Header>
					<Card.Title className="flex items-center text-sm">
						<TiltedSendIcon className="text-xl mr-2" /> 友链
					</Card.Title>
				</Card.Header>
				<Card.Content className=" text-zinc-600 dark:text-zinc-400 text-sm">
					<p className="mb-2 flex justify-center">
						<EmptyIcon className="w-9 h-9" />
					</p>
					<p className="text-center">暂无添加友链</p>
				</Card.Content>
			</Card>
		</div>
	);
}
