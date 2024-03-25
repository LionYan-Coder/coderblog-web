import Article from '@/app/_components/article';
import { EResponseCode } from '@/app/_utils/enum';
import http from '@/app/_utils/network';

async function getRecentArticle() {
	const { code, data, message } = await http<RecentArticleRes>(
		'/article/currentMonth',
		'GET',
		{ fetchInit: { cache: 'no-cache' } }
	);
	if (code !== EResponseCode.success) {
		throw new Error(message);
	}
	return data;
}
export default async function RecentPost() {
	const { total, list } = await getRecentArticle();
	return (
		<section className="px-4">
			<h4 className="my-8">Recent blog posts</h4>
			{total > 0 ? (
				<div className="flex flex-col">
					{list.map((article) => (
						<Article key={article.id} article={article} />
					))}
				</div>
			) : (
				<p>近期没有文章...</p>
			)}
		</section>
	);
}
