import { Container } from '~/components/ui';
import { EResponseCode } from '~/config/enum';
import http from '~/http';
import { NoteList } from './Note';
import { Metadata } from 'next';
import { list } from 'postcss';
import { EmptyIcon } from '~/assets';

async function fetchNotebookList() {
	const { code, data } = await http<NotebookListRes>('/notebook');
	if (code !== EResponseCode.success) {
		return [];
	}
	return data.list;
}

export const metadata: Metadata = {
	title: '我的想法',
	description: '这是我的想法，记录和分享平时遇到的想法、观点和经验'
};

export default async function NotePage() {
	const list = await fetchNotebookList();
	return (
		<Container className="mt-16 sm:mt-20">
			<header className="max-w-2xl">
				<h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
					{metadata.title as string}
				</h1>
				<p className="my-6 text-base text-zinc-600 dark:text-zinc-400">
					<span className="text-balance">{metadata.description}</span>
				</p>
			</header>

			<div className="mt-16 sm:mt-20">
				{list && list.length > 0 ? (
					<div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
						<NoteList notes={list || []} />
					</div>
				) : (
					<div className="max-w-2xl flex flex-col justify-center text-muted-foreground space-y-3">
						<EmptyIcon className="w-9 h-9" />
						<p>暂无想法💡...</p>
					</div>
				)}
			</div>
		</Container>
	);
}
