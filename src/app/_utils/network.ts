import { ContentType } from './constants';
import { EContentType, EResponseType } from './enum';

type THtppMethod = 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH';

interface IHttpOptions {
	data?: Record<string, any> | FormData | BodyInit;
	params?: Record<string, any>;
	responseType?: EResponseType;
	headers?: HeadersInit;
	fetchInit?: RequestInit;
	requestInit?: RequestInit;
}

interface Response<T> {
	code: number;
	message: string;
	data: T;
}

export async function http<T = any>(
	url: string,
	method: THtppMethod = 'GET',
	{ responseType = EResponseType.json, ...rest }: IHttpOptions = {}
): Promise<Response<T>> {
	const baseUrl = process.env.API_URL + url;
	const paramsUrl = formatUrlParams(rest.params);
	const request = new Request(
		paramsUrl ? baseUrl + '?' + paramsUrl : baseUrl,
		rest.requestInit
	);

	const headers: HeadersInit = {
		[ContentType]: EContentType.JSON,
		...rest.headers
	};

	let body: RequestInit['body'] = rest.data as BodyInit;

	if ((headers as Record<string, string>)[ContentType] === EContentType.JSON) {
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
				return Promise.reject(res);
			}
		})
		.catch((err) => {
			return Promise.reject(err);
		});
}

export function formatUrlParams(params: IHttpOptions['params']) {
	if (params && Object.keys(params).length > 0) {
		let str = '';
		for (const key in params) {
			str += `${key}=${params[key]}&`;
		}
		return str;
	} else {
		return '';
	}
}

export default http;
