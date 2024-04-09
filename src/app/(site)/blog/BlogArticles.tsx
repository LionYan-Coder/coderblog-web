'use client';
import { BlogArticleCard, RecentBlogArticleCard } from './BlogArticleCard';

export function BlogArticles({ articles }: { articles: Article[] }) {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 mt-12 sm:mt-20 gap-6 sm:gap-8">
			{articles.map((article) => (
				<BlogArticleCard key={article.id} article={article} />
			))}
		</div>
	);
}

export function RecnetBlogArticles({ articles }: { articles: Article[] }) {
	return (
		<div className="flex flex-col gap-16">
			{articles.map((article) => (
				<RecentBlogArticleCard key={article.id} article={article} />
			))}
		</div>
	);
}
