import { Container } from '~/components/ui';
import { EResponseCode } from '~/config/enum';
import http from '~/http';
import { BlogArticles } from './BlogArticles';

async function fetchBlogList() {
	const { code, data } = await http<ArticleListRes>('/article');
	if (code !== EResponseCode.success) {
		return [];
	}
	return data.list;
}

export default async function BlogPage() {
	const res = await fetchBlogList();
	return (
		<Container className="mt-16 sm:mt-20">
			<header className="max-w-2xl">
				<h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
					我的博客
				</h1>
				<p className="my-6 text-base text-zinc-600 dark:text-zinc-400">
					<span className="text-balance">
						我的博客之路：探索、思考、分享、记录点滴、启发思考。
					</span>
				</p>
			</header>
			<BlogArticles articles={res} />
		</Container>
	);
}
