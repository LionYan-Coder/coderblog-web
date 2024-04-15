import { SignIn } from '@clerk/nextjs';
import { Container } from '~/components/ui';

export default function Page() {
	return (
		<Container className="mt-32">
			<SignIn />
		</Container>
	);
}
