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

	return {
		http
	};
}

export default useHttp;
