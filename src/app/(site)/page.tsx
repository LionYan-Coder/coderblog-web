import Post from './Post';
import Resume from './Resume';
import { Container } from '~/components/ui';

export default function Home() {
	return (
		<Container>
			<Resume />
			<div className="mx-auto mt-16 sm:mt-20">
				<Post />
			</div>
		</Container>
	);
}
