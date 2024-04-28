'use client';

import { Button } from '~/components/ui';

interface IHttpError {
	code: number;
	message: string;
}

export function HttpErrorBoundary({
	error,
	reset
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	console.log('error', error);
	const parseError = JSON.parse(error.message) as IHttpError;

	return (
		<div className="flex flex-col gap-4 justify-center items-center border-2 border-red-500 rounded-lg bg-red-300/30 text-red-600 h-full min-h-40">
			<h3 className="text-2xl font-semibold">{parseError.code}</h3>
			<p className="text-base font-medium">{parseError.message}</p>
			<Button variant="destructive" onClick={() => reset()}>
				reset
			</Button>
		</div>
	);
}
