import Article from '~/components/Article';
import Pagination from '~/components/Pagination';
import { EResponseCode } from '~/config/enum';
import http from '~/http';

async function fetchArticleList(params: ArticleListReq) {
	const { code, data, message } = await http<ArticleListRes>(
		'/article',
		'GET',

		{
			params,
			fetchInit: { cache: 'no-cache' }
		}
	);
	if (code !== EResponseCode.success) {
		throw new Error(message);
	}
	return data;
}

interface Props {
	searchParams: ArticleListReq;
}

export default async function Home({ searchParams }: Props) {
	const { total, size, page, list } = await fetchArticleList(searchParams);
	return (
		<section className="px-4">
			<h4 className="my-4" id="allblog">
				All blog posts
			</h4>
			{total > 0 ? (
				<div className="flex flex-col">
					{list.map((article) => (
						<Article key={article.id} article={article} />
					))}
					<Pagination curPage={page} size={size} total={total} hash="allblog" />
				</div>
			) : (
				<p>没有文章...</p>
			)}
		</section>
	);
}
