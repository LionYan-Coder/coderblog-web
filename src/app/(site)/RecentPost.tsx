import { EResponseCode } from '~/config/enum';
import http from '~/http';
import BlogArticles from './blog/BlogArticles';

async function fetchRecentArticle() {
	const { data, code } = await http<RecentArticleRes>(
		'/article/currentMonth',
		'GET'
	);
	if (code !== EResponseCode.success) {
		return [];
	}
	return data.list;
}

export default async function RecentArticle() {
	const articles = await fetchRecentArticle();
	return <BlogArticles articles={articles} />;
}
