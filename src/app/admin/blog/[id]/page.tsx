import { EditBlog } from './EditBlog';

interface IProps {
	params: { id: string };
}

export async function generateMetadata({ params }: IProps) {
	return {
		title: params.id !== '0' ? '编辑博客' : '新建博客'
	};
}

export default function Page({ params }: IProps) {
	return <EditBlog></EditBlog>;
}
