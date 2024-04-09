import FriendLink from './FriendLink';
import RecentPost from './RecentPost';
import Resume from './Resume';
import { Container } from '~/components/ui';

export default function Home() {
	return (
		<Container>
			<Resume />
			<div className="mx-auto mt-32 max-w-xl lg:max-w-none grid grid-cols-1 lg:grid-cols-2">
				<RecentPost />
				<FriendLink />
			</div>
		</Container>
	);
}
