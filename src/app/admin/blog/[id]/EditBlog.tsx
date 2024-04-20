'use client';
import { BackButton, Badge, Button, Card, Form, Input } from '~/components';
import { ArrowUpToLineIcon, CheckIcon } from '~/assets';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
	title: z.string().max(30, {
		message: '标题不能超过30个字符'
	})
});

export function EditBlog() {
	const params = useParams();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {}
	});

	return (
		<div className="md:max-w-4xl mx-auto">
			<div className="flex items-center gap-4 mb-4">
				<BackButton />
				<h1 className="text-xl font-semibold tracking-tight whitespace-nowrap">
					{params.id !== '0' ? '编辑博客' : '新建博客'}
				</h1>
				<Badge className="ml-auto sm:ml-0" variant="outline">
					Unpublish
				</Badge>
				<div className="hidden md:flex md:ml-auto items-center gap-2">
					<Button size="sm" variant="outline" disabled>
						<ArrowUpToLineIcon className=" mr-2" />
						发布
					</Button>
					<Button size="sm">
						<CheckIcon className="text-base mr-2" />
						保存
					</Button>
				</div>
			</div>
			<Card>
				<Card.Header>
					<Card.Title>博客详细</Card.Title>
					<Card.Description>这里填写的信息，会显示在博客列表</Card.Description>
				</Card.Header>
				<Card.Content>
					<Form {...form}>
						<Form.Field
							control={form.control}
							name="title"
							render={({ field }) => (
								<Form.Item>
									<Form.Label>标题</Form.Label>
									<Form.Control>
										<Input placeholder="请输入博客标题" {...field} />
									</Form.Control>
									<Form.Message />
								</Form.Item>
							)}
						/>
					</Form>
				</Card.Content>
			</Card>
		</div>
	);
}
