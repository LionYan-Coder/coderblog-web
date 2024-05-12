import { EResponseCode } from '~/config/enum';
import { useHttp } from '~/http';
import { toast } from '~/components';

export function useArticleApi() {
	const { http } = useHttp();
	async function fetchCreateArticle(params: CreateArticleReq) {
		const { code, data, message } = await http<CreateArticleRes>(
			'/admin/article',
			'PUT',
			{
				data: params
			}
		);
		if (code !== EResponseCode.success) {
			toast({
				title: code + '',
				description: message,
				variant: 'warning'
			});
			return Promise.reject({ code, data, message });
		}
		toast({
			title: '保存成功',
			description: '保存成功',
			variant: 'success'
		});

		return data;
	}

	async function fetchUpdateArticle(id: number, params: UpdateArticleReq) {
		const { code, data, message } = await http('/admin/article/' + id, 'POST', {
			data: params
		});
		if (code !== EResponseCode.success) {
			toast({
				title: code + '',
				description: message,
				variant: 'warning'
			});
			return Promise.reject({ code, data, message });
		}
		toast({
			title: '保存成功',
			description: '保存成功',
			variant: 'success'
		});

		return data;
	}

	async function fetchDeleteArticle(id: number) {
		const { code, data, message } = await http(
			'/admin/article/' + id,
			'DELETE'
		);
		if (code !== EResponseCode.success) {
			toast({
				title: code + '',
				description: message,
				variant: 'warning'
			});
			return Promise.reject({ code, data, message });
		}
		toast({
			title: '删除成功',
			description: '删除成功',
			variant: 'success'
		});

		return data;
	}

	async function fetchArticleDetail(id: number) {
		const { code, data, message } = await http<Article>(
			`/admin/article/${id}`,
			'GET'
		);

		if (code !== EResponseCode.success) {
			toast({
				title: code + '',
				description: message,
				variant: 'warning'
			});
			return Promise.reject({ code, data, message });
		}

		return data;
	}
	async function fetchPublishArticle(id: number, publish: boolean) {
		const { code, data, message } = await http<Article>(
			`/admin/article/${publish ? 'publish' : 'unpublish'}/${id}`,
			'POST'
		);

		if (code !== EResponseCode.success) {
			toast({
				title: code + '',
				description: message,
				variant: 'warning'
			});
			return Promise.reject({ code, data, message });
		}

		if (publish) {
			toast({
				title: '发布成功',
				description: '发布成功',
				variant: 'success'
			});
		}

		return data;
	}

	async function fetchArticleList(params?: ArticleListReq) {
		const { code, data, message } = await http<ArticleListRes>(
			'/admin/article',
			'GET',
			{
				params
			}
		);

		if (code !== EResponseCode.success) {
			toast({
				title: code + '',
				description: message,
				variant: 'warning'
			});
		}
		return data;
	}

	return {
		fetchCreateArticle,
		fetchUpdateArticle,
		fetchDeleteArticle,
		fetchPublishArticle,
		fetchArticleDetail,
		fetchArticleList
	};
}
