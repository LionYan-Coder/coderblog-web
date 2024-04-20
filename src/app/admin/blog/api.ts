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
