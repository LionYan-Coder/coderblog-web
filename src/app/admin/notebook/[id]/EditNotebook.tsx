'use client';
import {
	BackButton,
	Button,
	Card,
	InfoCard,
	BadgeStatus,
	Form,
	Input,
	EntityDeleteButton,
	MarkdownEditor
} from '~/components';
import { ArrowUpToLineIcon, CheckIcon, LoaderCircleIcon } from '~/assets';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '~/components/ui/textarea';
import { StickyHeader } from '~/app/admin/_components/stickyHeader';
import { useEffect, useMemo, useState } from 'react';
import { CardStatus } from '~/components/entity/card-status';
import { useRouter } from 'next/navigation';
import { useEditorState } from '~/hooks/useEditor';
import { useNotebookApi } from '~/app/admin/notebook/useNotebookApi';
import { MilkdownProvider } from '@milkdown/react';
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/react';

const formSchema = z.object({
	title: z
		.string({
			required_error: '请填写标题'
		})
		.trim()
		.min(5, '标题不能小于5个字符')
		.max(30, '标题不能超过30个字符'),

	summary: z.string().trim().max(120, '概要不能超过120个字符'),
	tags: z.string().max(30, '标记不能超过30个字符')
});

interface EditBlogProps {
	article?: Notebook;
}

export function EditNotebook({ article }: EditBlogProps) {
	const router = useRouter();
	const {
		fetchDeleteNotebook,
		fetchCreateNotebook,
		fetchUpdateNotebook,
		fetchPublishNotebook
	} = useNotebookApi();
	const [currentNotebook, setCurrentNotebook] = useState<Notebook | undefined>(
		article
	);
	const { defaultValue, setValue, setDefaultValue } = useEditorState();
	const [saveLoading, setSaveLoading] = useState(false);
	const [publishLoading, setPublishLoading] = useState(false);
	const editorDefaultValue = useMemo(() => {
		return article?.content;
	}, [article?.content]);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: currentNotebook?.title || '',
			summary: currentNotebook?.summary || '',
			tags: currentNotebook?.tags.join(',') || ''
		}
	});

	async function handleSubmit(formData: z.infer<typeof formSchema>) {
		setSaveLoading(true);
		const params = {
			...formData,
			tags: formData.tags.split(',')
		};
		const { id } = await (
			currentNotebook?.id
				? fetchUpdateNotebook(currentNotebook?.id, params)
				: fetchCreateNotebook(params)
		).finally(() => setSaveLoading(false));
		id && router.replace('/admin/blog/' + id);
	}

	async function handleDelete() {
		await fetchDeleteNotebook(currentNotebook?.id || 0);
		router.back();
		return true;
	}

	async function handlePublish() {
		setPublishLoading(true);
		await fetchPublishNotebook(
			currentNotebook?.id || 0,
			!currentNotebook?.published
		).finally(() => setPublishLoading(false));

		setCurrentNotebook((origin) => ({
			...(origin as Notebook),
			published: !origin?.published
		}));
	}

	useEffect(() => {
		if (article?.content) {
			setDefaultValue(article?.content);
		}
	}, [article?.content]);

	return (
		<div className="md:max-w-6xl mx-auto">
			<StickyHeader className="flex items-center gap-4 mb-4">
				<BackButton />
				<h1 className="text-xl font-semibold tracking-tight whitespace-nowrap">
					{currentNotebook?.id ? currentNotebook.title : '新建笔记'}
				</h1>
				<BadgeStatus
					published={currentNotebook?.published}
					className="ml-auto sm:ml-0"
				/>
				<div className="hidden md:flex md:ml-auto items-center gap-2">
					<Button
						variant="success"
						disabled={!currentNotebook?.id}
						onClick={handlePublish}
					>
						{publishLoading ? (
							<LoaderCircleIcon className="text-base animate-spin mr-2" />
						) : (
							<ArrowUpToLineIcon className="mr-2" />
						)}
						{currentNotebook?.published ? '撤销发布' : '发布'}
					</Button>
					<Button onClick={() => form.handleSubmit(handleSubmit)()}>
						{saveLoading ? (
							<LoaderCircleIcon className="text-base animate-spin mr-2" />
						) : (
							<CheckIcon className="text-base mr-2" />
						)}
						保存
					</Button>
				</div>
			</StickyHeader>
			<div className="grid gap-4 md:grid-cols-[1fr_255px] lg:grid-cols-4 lg:gap-8 mb-4">
				<div className="grid auto-rows-max gap-4 md:col-span-3 lg:gap-8 order-2 md:order-first">
					<Card>
						<Card.Header>
							<Card.Title>笔记详细</Card.Title>
							<Card.Description>
								这里填写的信息，会显示在笔记列表
							</Card.Description>
						</Card.Header>
						<Card.Content>
							<Form {...form}>
								<div className="grid sm:grid-cols-2 gap-6">
									<Form.Field
										control={form.control}
										name="title"
										render={({ field }) => (
											<Form.Item>
												<Form.Label>标题</Form.Label>
												<Form.Control>
													<Input placeholder="笔记标题" {...field} />
												</Form.Control>
												<Form.Message />
											</Form.Item>
										)}
									/>
									<Form.Field
										control={form.control}
										name="tags"
										render={({ field }) => (
											<Form.Item>
												<Form.Label>标记</Form.Label>
												<Form.Control>
													<Input placeholder="笔记标记" {...field} />
												</Form.Control>
												<Form.Description>
													每个标记后使用 “,” 相接
												</Form.Description>
												<Form.Message />
											</Form.Item>
										)}
									/>

									<div className="sm:col-span-2">
										<Form.Field
											control={form.control}
											name="summary"
											render={({ field }) => (
												<Form.Item>
													<Form.Label>概要</Form.Label>
													<Form.Control>
														<Textarea
															rows={5}
															placeholder="笔记概要"
															{...field}
														/>
													</Form.Control>
													<Form.Message />
												</Form.Item>
											)}
										/>
									</div>
								</div>
							</Form>
						</Card.Content>
					</Card>
				</div>

				<div className="grid auto-rows-max gap-4 order-first md:order-2">
					<CardStatus published={currentNotebook?.published} />
					<InfoCard entity={currentNotebook} />
					{currentNotebook?.id && (
						<EntityDeleteButton
							onConfirm={handleDelete}
							buttonProps={{ className: 'hidden md:inline-flex' }}
						/>
					)}
				</div>
				<div className="md:col-span-4 order-last">
					<Card>
						<Card.Header>
							<Card.Title>笔记内容</Card.Title>
							<Card.Description>
								通过Milkdown富文本编辑器编写MDX内容
							</Card.Description>
						</Card.Header>
						<Card.Content>
							<MilkdownProvider>
								<ProsemirrorAdapterProvider>
									<MarkdownEditor value={defaultValue} />
								</ProsemirrorAdapterProvider>
							</MilkdownProvider>
						</Card.Content>
					</Card>
				</div>
			</div>

			<div className="flex items-center gap-4 md:hidden">
				{currentNotebook?.id && <EntityDeleteButton onConfirm={handleDelete} />}
				<div className="flex ml-auto items-center gap-2">
					<Button
						variant="success"
						disabled={!currentNotebook?.id}
						onClick={handlePublish}
					>
						{publishLoading ? (
							<LoaderCircleIcon className="text-base animate-spin mr-2" />
						) : (
							<ArrowUpToLineIcon className="mr-2" />
						)}
						{currentNotebook?.published ? '撤销发布' : '发布'}
					</Button>
					<Button onClick={() => form.handleSubmit(handleSubmit)()}>
						{saveLoading ? (
							<LoaderCircleIcon className="text-base animate-spin mr-2" />
						) : (
							<CheckIcon className="text-base mr-2" />
						)}
						保存
					</Button>
				</div>
			</div>
		</div>
	);
}
