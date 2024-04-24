import { EResponseCode } from '~/config/enum';
import http from '~/http';
import { RecentBlogArticles } from './blog/BlogArticles';
import { EmptyIcon, PencilSwooshIcon } from '~/assets';

async function fetchArticles() {
	const { data, code } = await http<ArticleListRes, ArticleListReq>(
		'/article',
		'GET',
		{ params: { size: 7, page: 1 } }
	);
	if (code !== EResponseCode.success) {
		return [];
	}
	return data.list;
}

export default async function Post() {
	const articles = await fetchArticles();
	return (
		<div>
			<p className="text-sm font-semibold mb-10 text-zinc-800 dark:text-zinc-200 flex items-center">
				<PencilSwooshIcon className="mr-2 text-xl" />
				近期文章
			</p>
			{articles && articles.length > 0 ? (
				<RecentBlogArticles articles={articles || []} />
			) : (
				<p className="mb-2  text-muted-foreground">暂无博客...</p>
			)}
		</div>
	);
}
