'use client';
import { motion } from 'framer-motion';
import { BlogArticleCard, RecentBlogArticleCard } from './BlogArticleCard';

export function BlogArticles({ articles }: { articles: Article[] }) {
	return (
		<motion.div
			variants={{
				initial: { opacity: 0 },
				animate: {
					opacity: 1,
					transition: {
						staggerChildren: 0.2
					}
				}
			}}
			initial="initial"
			animate="animate"
			className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12 sm:mt-20 gap-6 sm:gap-8"
		>
			{articles.map((article) => (
				<BlogArticleCard key={article.id} article={article} />
			))}
		</motion.div>
	);
}

export function RecentBlogArticles({ articles }: { articles: Article[] }) {
	return (
		<motion.div
			variants={{
				initial: { opacity: 0 },
				animate: {
					opacity: 1,
					transition: {
						staggerChildren: 0.3
					}
				}
			}}
			initial="initial"
			whileInView="animate"
			className="flex flex-col gap-16"
		>
			{articles.map((article) => (
				<RecentBlogArticleCard key={article.id} article={article} />
			))}
		</motion.div>
	);
}
