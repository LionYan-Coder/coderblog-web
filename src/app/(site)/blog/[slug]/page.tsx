import { Button, Container } from '~/components';
import { CalendarIcon, TagIcon, UTurnLeftIcon } from '~/assets';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import http from '~/http';
import { EResponseCode } from '~/config/enum';
import dayjs from 'dayjs';
import Balancer from 'react-wrap-balancer';
import { BlogPostPage } from '~/app/(site)/blog/BlogPostPage';

async function getBlog(slug: string) {
	const { data, code } = await http<Article>('/article/' + slug, 'GET');
	if (code !== EResponseCode.success) {
		return null;
	}
	return data;
}

export const generateMetadata = async ({
	params
}: {
	params: { slug: string };
}) => {
	console.log('params', params);
	const post = await getBlog(params.slug);
	if (!post) {
		notFound();
	}

	const { title, summary, coverUrl } = post;

	return {
		title,
		description: summary,
		openGraph: {
			title,
			description: summary,
			images: [
				{
					url: coverUrl
				}
			],
			type: 'article'
		},
		twitter: {
			images: [
				{
					url: coverUrl
				}
			],
			title,
			description: summary,
			card: 'summary_large_image',
			site: 'lionblog.cc',
			creator: '@lion'
		}
	};
};

export default async function Page({ params }: { params: { slug: string } }) {
	const post = await getBlog(params.slug);
	if (!post) {
		notFound();
	}
	return <BlogPostPage post={post} />;
}

export const revalidate = 60;
