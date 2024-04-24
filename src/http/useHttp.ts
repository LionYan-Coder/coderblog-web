import { Authorization, ContentType } from '~/config/constants';
import { EContentType, EResponseCode, EResponseType } from '~/config/enum';
import { useAuth } from '@clerk/nextjs';
import { IHttpOptions, THttpMethod, formatUrlParams } from '.';
import { useToast } from '~/components';

export function useHttp() {
	const { getToken, userId } = useAuth();
	const { toast } = useToast();
	async function http<T = any, P = Record<string, any>>(
		url: string,
		method: THttpMethod = 'GET',
		{ responseType = EResponseType.json, ...rest }: IHttpOptions<P> = {}
	): Promise<BaseResponse<T>> {
		const baseUrl = process.env.NEXT_PUBLIC_API_URL + url;
		const paramsUrl = rest.params ? formatUrlParams(rest.params) : rest.params;
		const request = new Request(
			paramsUrl ? baseUrl + '?' + paramsUrl : baseUrl,
			rest.requestInit
		);

		const headers: HeadersInit = {
			[ContentType]: EContentType.JSON,
			UserId: userId || '',
			[Authorization]: `Bearer ${await getToken()}`,
			...rest.headers
		};

		let body: RequestInit['body'] = rest.data as BodyInit;

		if (
			(headers as Record<string, string>)[ContentType] === EContentType.JSON
		) {
			body = JSON.stringify(rest.data);
		}
		return fetch(request, {
			method,
			headers,
			body,
			...rest.fetchInit
		})
			.then((res) => {
				if (res.ok) {
					return res[responseType]();
				} else {
					toast({
						title: '网络请求错误 ' + res.status,
						description: res.statusText,
						variant: 'destructive'
					});
					return Promise.reject(res);
				}
			})
			.catch((err) => {
				if (err instanceof TypeError) {
					toast({
						title: '服务器错误',
						description: err.message,
						variant: 'destructive'
					});
				}
				return Promise.reject(err);
			});
	}

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
		const { code, data, message } = await http('/admin/article/' + id, 'PUT', {
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
		http,
		fetchCreateArticle,
		fetchArticleDetail,
		fetchArticleList,
		fetchUpdateArticle,
		fetchDeleteArticle,
		fetchPublishArticle
	};
}

export default useHttp;
