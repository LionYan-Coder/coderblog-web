'use client';
import { Button, useToast } from '~/components/ui';
import { CornerUpIcon } from '~/assets';
import { useRouter } from 'next/navigation';

export function BackButton() {
	const { toast } = useToast();
	const router = useRouter();
	return (
		<Button
			onClick={() => router.back()}
			variant="outline"
			size="icon"
			className="w-7 h-7"
		>
			<CornerUpIcon className="h-4 w-4" />
			<span className="sr-only">返回</span>
		</Button>
	);
}
