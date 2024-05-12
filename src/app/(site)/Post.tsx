import { EResponseCode } from '~/config/enum';
import http from '~/http';
import { RecentBlogArticles } from './blog/BlogArticles';

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
	return articles && articles.length > 0 ? (
		<div className="relative sm:pb-12 sm:ml-[calc(2rem+1px)] md:ml-[calc(3.5rem+1px)] lg:ml-[max(calc(14.5rem+1px),calc(100%-50rem))]">
			<div className="hidden absolute top-3 bottom-0 right-full mr-7 md:mr-[3.25rem] w-px bg-slate-200 dark:bg-slate-800 sm:block"></div>
			<RecentBlogArticles articles={articles || []} />
		</div>
	) : (
		<p className="mb-2  text-muted-foreground">暂无博客...</p>
	);
}
