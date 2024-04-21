import http from '~/http';
import { EResponseCode } from '~/config/enum';

export async function fetchArticleList(params?: ArticleListReq) {
	const { code, data, message } = await http<ArticleListRes>(
		'/admin/article',
		'GET',
		{
			params
		}
	);

	if (code !== EResponseCode.success) {
		throw new Error(JSON.stringify({ code, message }));
	}
	return data;
}

export async function fetchArticleDetail(id: number) {
	const { code, data, message } = await http<Article>(
		`/admin/article/${id}`,
		'GET'
	);

	if (code !== EResponseCode.success) {
		throw new Error(JSON.stringify({ code, message }));
	}
	return data;
}
