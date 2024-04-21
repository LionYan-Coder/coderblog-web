'use client';
import { Input, Progress } from '~/components/ui';
import { ChangeEvent, ReactNode, useState } from 'react';
import { getBase64 } from '~/lib/file';
import { AnimatePresence, motion } from 'framer-motion';
import { Authorization } from '~/config/constants';
import { useAuth } from '@clerk/nextjs';
import { EResponseCode } from '~/config/enum';
import { useToast } from '~/components/ui/use-toast';
import { cn } from '~/lib/utils';
import { ImagePlaceholderIcon } from '~/assets';
import Image from 'next/image';

interface UploadImageProps {
	value?: string;
	onUploadStart?: () => void;
	onUploadComplete?: (data: UploadImageRes) => void;
}

export function UploadImage({
	value,
	onUploadStart,
	onUploadComplete
}: UploadImageProps) {
	const { getToken } = useAuth();
	const [loading, setLoading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [imageUrl, setImageUrl] = useState<string>(value || '');
	const [imageName, setImageName] = useState<string>('');
	const { toast } = useToast();

	async function handleChangeFile(e: ChangeEvent<HTMLInputElement>) {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			const url = await getBase64(file);
			setImageUrl(url);
			setImageName(file.name);
			const formData = new FormData();
			formData.append('file', file);

			const xhr = new XMLHttpRequest();
			const token = `Bearer ${await getToken()}` || '';
			xhr.open('POST', process.env.NEXT_PUBLIC_API_URL + '/admin/upload', true);
			xhr.setRequestHeader(Authorization, token);
			xhr.upload.addEventListener('progress', (event) => {
				if (event.lengthComputable) {
					const percentComplete = (event.loaded / event.total) * 100;
					setUploadProgress(Number(percentComplete.toFixed(2)));
				}
			});
			xhr.onload = () => {
				if (xhr.status === 200) {
					const { data, code, message } = JSON.parse(
						xhr.responseText
					) as BaseResponse<UploadImageRes>;
					if (code === EResponseCode.success) {
						setImageUrl(data.url);
						setImageName(data.name);
						onUploadComplete?.(data);
					} else {
						toast({
							title: `文件上传失败 ${code}`,
							description: message,
							variant: 'destructive'
						});
					}
				} else {
					toast({
						title: `服务器错误 ${xhr.status}`,
						description: xhr.statusText,
						variant: 'destructive'
					});
				}
			};

			xhr.onerror = (err) => {
				console.log('err', err);
				setLoading(false);
			};
			xhr.onloadstart = () => {
				onUploadStart?.();
				setLoading(true);
			};
			xhr.onloadend = () => {
				setLoading(false);
			};

			xhr.send(formData);
		}
	}

	return (
		<div className="relative border-2 border-dashed hover:border-primary/50 transition-colors rounded-md flex items-center justify-center">
			{imageUrl ? (
				<UploadLoading
					loading={loading}
					progress={uploadProgress}
					className="flex items-center justify-center"
				>
					<AnimatePresence mode="popLayout">
						<motion.img
							key={imageName}
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							className="w-full aspect-video object-cover rounded-md"
							src={imageUrl}
							alt="upload image"
						></motion.img>
					</AnimatePresence>
					<Input
						type="file"
						className="absolute w-full h-full opacity-0"
						onChange={handleChangeFile}
						accept="image/*"
					></Input>
				</UploadLoading>
			) : (
				<>
					<div className="w-full aspect-video rounded-md overflow-hidden bg-muted">
						<ImagePlaceholderIcon className="w-full h-full" />
					</div>
					<Input
						type="file"
						className="absolute w-full h-full opacity-0"
						onChange={handleChangeFile}
						accept="image/*"
					></Input>
				</>
			)}
		</div>
	);
}

export function UploadLoading({
	children,
	progress,
	text,
	className,
	loading
}: {
	children: ReactNode;
	progress: number;
	className?: string;
	text?: ReactNode;
	loading?: boolean;
}) {
	return (
		<div className={cn('relative w-full', className)}>
			<AnimatePresence>
				{loading && (
					<>
						<motion.div
							initial={{ opacity: 0, y: 30, scale: 0.95 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: 30, scale: 0.96 }}
							key="loading"
							className="absolute inset-0 w-full h-full flex justify-center items-center z-10"
						>
							<div className="relative flex flex-col space-y-1 justify-center items-center">
								<Image
									width={16}
									height={16}
									className="w-4 h-4 animate-bounce"
									src="/upload-arrow.png"
									alt="upload-arrow"
								/>
								<div className="flex items-center">
									<Progress className="shrink" value={progress} />
									<p className="text-xs text-white">{progress + '%'}</p>
								</div>
								{text}
							</div>
						</motion.div>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							key="overlay"
							className="absolute inset-0 w-full h-full bg-zinc-800/40 dark:bg-black/80"
						/>
					</>
				)}
			</AnimatePresence>
			{children}
		</div>
	);
}
