import { EditNotebook } from './EditNotebook';
import http from '~/http';
import { EResponseCode } from '~/config/enum';

async function fetchNotebookDetail(id: number) {
	const { code, data, message } = await http<Article>(
		`/admin/notebook/${id}`,
		'GET'
	);

	if (code !== EResponseCode.success) {
		throw new Error(JSON.stringify({ code, message }));
	}
	return data;
}

interface IProps {
	params: { id: string };
}

export async function generateMetadata({ params }: IProps) {
	const article =
		Number(params.id) !== 0
			? await fetchNotebookDetail(Number(params.id))
			: undefined;
	return {
		title: article?.title || '新建笔记'
	};
}

export default async function Page({ params }: IProps) {
	const article =
		Number(params.id) !== 0
			? await fetchNotebookDetail(Number(params.id))
			: undefined;
	return <EditNotebook article={article} />;
}
