interface ArticleListRes {
	list?: Article[];
	total: number;
	page: number;
	size: number;
}

interface ArticleListReq {
	page?: number;
	size?: number;
}

interface RecentArticleRes {
	list: Article[];
	total: number;
}

interface Article {
	id: number;
	author: string;
	title: string;
	summary: string;
	content: string;
	coverUrl: string;
	tags: string[];
	createAt: string;
	updateAt: string;
	published: boolean;
}

interface CreateArticleReq {
	title: string;
	coverUrl: string;
	summary?: string;
	content?: string;
	tags?: string[];
}

interface UpdateArticleReq extends CreateArticleReq {}

interface CreateArticleRes {
	id: number;
}
