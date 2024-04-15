import { Container } from '~/components/ui';
import { EResponseCode } from '~/config/enum';
import http from '~/http';
import { NoteList } from './Note';

async function fetchBlogList() {
	const { code, data } = await http<ArticleListRes>('/article');
	if (code !== EResponseCode.success) {
		return [];
	}
	return data.list;
}

export default async function NotePage() {
	const res = await fetchBlogList();
	return (
		<Container className="mt-16 sm:mt-20">
			<header className="max-w-2xl">
				<h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
					我的笔记
				</h1>
				<p className="my-6 text-base text-zinc-600 dark:text-zinc-400">
					<span className="text-balance">
						记录和分享平时遇到的想法、观点和经验
					</span>
				</p>
			</header>

			<div className="mt-16 sm:mt-20">
				<div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
					<NoteList notes={res} />
				</div>
			</div>
		</Container>
	);
}
