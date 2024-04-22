'use client';
import {
	BackButton,
	Button,
	Card,
	EntityInfoCard,
	EntityStatusBadge,
	Form,
	Input,
	MilkdownEditorWrapper,
	UploadImage
} from '~/components';
import {
	ArrowUpToLineIcon,
	CheckIcon,
	LoaderCircleIcon,
	TrashIcon
} from '~/assets';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '~/components/ui/textarea';
import { StickyHeader } from '~/app/admin/_components/stickyHeader';
import { useState } from 'react';
import { EntityStatusCard } from '~/components/EntityStatusCard';
import { useHttp } from '~/http';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
	title: z
		.string({
			required_error: '请填写标题'
		})
		.trim()
		.min(5, '标题不能小于5个字符')
		.max(30, '标题不能超过30个字符'),

	summary: z.string().trim().max(120, '概要不能超过120个字符'),
	tags: z.string().max(30, '标记不能超过30个字符'),
	coverUrl: z.string().min(1, '缺少封面').url({ message: '地址不合法' })
});

interface EditBlogProps {
	article?: Article;
}

export function EditBlog({ article }: EditBlogProps) {
	const router = useRouter();
	const { fetchCreateArticle } = useHttp();
	const [currentArticle, setCurrentArtilce] = useState<Article | undefined>(
		article
	);
	const [saveLoading, setSaveLoading] = useState(false);
	const [publishLoading, setPublishLoading] = useState(false);
	const [content, setContent] = useState<Article['content']>(
		currentArticle?.content || ''
	);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: currentArticle?.title || '',
			summary: currentArticle?.summary || '',
			tags: currentArticle?.tags.join(',') || '',
			coverUrl: currentArticle?.coverUrl || ''
		}
	});

	console.log('currentArticle', currentArticle);

	async function handleSubmit(formData: z.infer<typeof formSchema>) {
		setSaveLoading(true);
		const params = { ...formData, content, tags: formData.tags.split(',') };
		const { id } = await fetchCreateArticle(params).finally(() =>
			setSaveLoading(false)
		);
		router.replace('/admin/blog/' + id);
	}

	return (
		<div className="md:max-w-6xl mx-auto">
			<StickyHeader className="flex items-center gap-4 mb-4">
				<BackButton />
				<h1 className="text-xl font-semibold tracking-tight whitespace-nowrap">
					{currentArticle?.id ? currentArticle.title : '新建博客'}
				</h1>
				<EntityStatusBadge
					published={currentArticle?.published}
					className="ml-auto sm:ml-0"
				/>
				<div className="hidden md:flex md:ml-auto items-center gap-2">
					<Button size="sm" variant="success" disabled={!currentArticle?.id}>
						{publishLoading ? (
							<LoaderCircleIcon className="text-base animate-spin mr-2" />
						) : (
							<ArrowUpToLineIcon className="mr-2" />
						)}
						发布
					</Button>
					<Button onClick={() => form.handleSubmit(handleSubmit)()} size="sm">
						{saveLoading ? (
							<LoaderCircleIcon className="text-base animate-spin mr-2" />
						) : (
							<CheckIcon className="text-base mr-2" />
						)}
						保存
					</Button>
				</div>
			</StickyHeader>
			<div className="grid gap-4 md:grid-cols-[1fr_224px] lg:grid-cols-4 lg:gap-8 mb-4">
				<div className="grid auto-rows-max gap-4 lg:col-span-3 lg:gap-8 order-2 md:order-first">
					<Card>
						<Card.Header>
							<Card.Title>博客详细</Card.Title>
							<Card.Description>
								这里填写的信息，会显示在博客列表
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
													<Input placeholder="博客标题" {...field} />
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
													<Input placeholder="博客标记" {...field} />
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
															placeholder="博客概要"
															{...field}
														/>
													</Form.Control>
													<Form.Message />
												</Form.Item>
											)}
										/>
									</div>
									<div className="sm:col-span-2">
										<Form.Field
											control={form.control}
											name="coverUrl"
											render={({ field: { onChange, value } }) => (
												<Form.Item>
													<Form.Label>封面</Form.Label>
													<Form.Control>
														<UploadImage
															value={value}
															onUploadComplete={(data) => onChange(data.url)}
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
					<EntityStatusCard published={currentArticle?.published} />
					<EntityInfoCard entity={currentArticle} />
					{currentArticle?.id && (
						<Button variant="destructive" size="sm">
							<TrashIcon className="mr-2 text-base" />
							删除此数据
						</Button>
					)}
				</div>
				<div className="md:col-span-4 order-last">
					<Card>
						<Card.Header>
							<Card.Title>博客内容</Card.Title>
							<Card.Description>
								通过Milkdown富文本编辑器编写MDX内容
							</Card.Description>
						</Card.Header>
						<Card.Content>
							<MilkdownEditorWrapper />
						</Card.Content>
					</Card>
				</div>
			</div>

			<div className="flex items-center gap-4 sm:hidden">
				{currentArticle?.id && (
					<Button variant="destructive" size="sm">
						<TrashIcon className="mr-2 text-base" />
						删除此数据
					</Button>
				)}
				<div className="flex ml-auto items-center gap-2">
					<Button size="sm" variant="success" disabled={!currentArticle?.id}>
						<ArrowUpToLineIcon className="mr-2" />
						发布
					</Button>
					<Button onClick={() => form.handleSubmit(handleSubmit)()} size="sm">
						<CheckIcon className="text-base mr-2" />
						保存
					</Button>
				</div>
			</div>
		</div>
	);
}
