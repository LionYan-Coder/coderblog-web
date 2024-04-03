import { EResponseCode } from '~/config/enum';
import http from '~/http';
import BlogArticles from './blog/BlogArticles';
import { PencilSwooshIcon } from '~/assets';

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
	return (
		<div>
			<p className="text-sm font-semibold mb-10 text-zinc-800 dark:text-zinc-200 flex items-center">
				<PencilSwooshIcon className="mr-2 text-xl" />
				近期文章
			</p>
			<BlogArticles articles={articles} />
		</div>
	);
}
