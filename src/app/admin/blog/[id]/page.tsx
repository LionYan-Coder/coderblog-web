import { EditBlog } from './EditBlog';
import { fetchArticleDetail } from '~/app/admin/blog/api';

interface IProps {
	params: { id: string };
}

export async function generateMetadata({ params }: IProps) {
	return {
		title: params.id !== '0' ? '编辑博客' : '新建博客'
	};
}

export default async function Page({ params }: IProps) {
	const article =
		Number(params.id) !== 0
			? await fetchArticleDetail(Number(params.id))
			: undefined;
	return <EditBlog article={article} />;
}
