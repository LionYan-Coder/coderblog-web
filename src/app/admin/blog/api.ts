import http from '~/http';
import { EResponseCode } from '~/config/enum';

export async function fetchArticleList(params?: ArticleListReq) {
	const { code, data } = await http<ArticleListRes>('/admin/article', 'GET', {
		params
	});

	if (code !== EResponseCode.success) {
		return null;
	}
	return data;
}
