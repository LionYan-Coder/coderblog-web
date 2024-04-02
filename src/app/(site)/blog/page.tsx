import { Container } from '~/components/ui';

export default function BlogPage() {
	function onClick() {
		console.log('click');
	}

	return (
		<Container>
			<MyBtn onClick={onClick}></MyBtn>
		</Container>
	);
}

function MyBtn({ onClick }: { onClick: () => void }) {
	return <button onClick={() => onClick()}></button>;
}
