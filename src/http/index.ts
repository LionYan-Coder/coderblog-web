import { ContentType } from '~/config/constants';
import { EContentType, EResponseType } from '~/config/enum';
import { cookies } from 'next/headers';
import { auth } from '@clerk/nextjs';

type THttpMethod = 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH';

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
	method: THttpMethod = 'GET',
	{ responseType = EResponseType.json, ...rest }: IHttpOptions = {}
): Promise<Response<T>> {
	const baseUrl = process.env.API_URL + url;
	const paramsUrl = formatUrlParams(rest.params);
	const request = new Request(
		paramsUrl ? baseUrl + '?' + paramsUrl : baseUrl,
		rest.requestInit
	);
	const { sessionClaims, getToken } = auth();
	const headers: HeadersInit = {
		[ContentType]: EContentType.JSON,
		SID: sessionClaims?.sid || '',
		SUB: sessionClaims?.sub || '',
		Authorization: `Bearer ${await getToken()}`,
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
