import BlogArticleCard from './BlogArticleCard';

export default async function BlogArticles({
	articles
}: {
	articles: Article[];
}) {
	return (
		<div className="flex flex-col gap-16">
			{articles.map((article) => (
				<BlogArticleCard key={article.id} article={article} />
			))}
		</div>
	);
}
