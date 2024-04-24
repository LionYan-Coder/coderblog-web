import { Container } from '~/components/ui';
import { EResponseCode } from '~/config/enum';
import http from '~/http';
import { BlogArticles } from './BlogArticles';
import { EmptyIcon } from '~/assets';

async function fetchBlogList() {
	const { code, data } = await http<ArticleListRes, ArticleListReq>('/article');
	if (code !== EResponseCode.success) {
		return [];
	}
	return data.list;
}

export default async function BlogPage() {
	const list = await fetchBlogList();
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
			{list && list.length > 0 ? (
				<BlogArticles articles={list || []} />
			) : (
				<div className="max-w-2xl flex flex-col justify-center text-muted-foreground space-y-3">
					<EmptyIcon className="w-9 h-9" />
					<p>暂无文章...</p>
				</div>
			)}
		</Container>
	);
}
