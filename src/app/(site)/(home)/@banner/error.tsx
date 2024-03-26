export default function Error({
	error,
	reset
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	console.log('error', error);

	return (
		<div>
			<h2>Something went wrong!</h2>
			<p>{error.digest}</p>
		</div>
	);
}
