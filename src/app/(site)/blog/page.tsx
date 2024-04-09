import { Container } from '~/components/ui';
import { EResponseCode } from '~/config/enum';
import http from '~/http';
import { BlogArticles } from './BlogArticles';

async function fetchBlogList() {
	const { code, data } = await http<ArticleListRes>('/article');
	if (code !== EResponseCode.success) {
		return [];
	}
	return data.list;
}

export default async function BlogPage() {
	const res = await fetchBlogList();
	return (
		<Container className="mt-16">
			<header className="max-w-2xl">
				<h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
					我的博客
				</h1>
				<p className="my-6 text-base text-zinc-600 dark:text-zinc-400">
					<span className="text-balance">
						写博客文章是我比较喜欢的沉淀分享方式，我希望能够把好用的技术知识传递给更多的人。我比较喜欢围绕着技术为主的话题，但是也会写一些非技术的话题，比如生活随笔等等。
					</span>
				</p>
			</header>
			<BlogArticles articles={res} />
		</Container>
	);
}
