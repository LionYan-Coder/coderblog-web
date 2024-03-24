interface RecentArticleRes {
	list: RecentArticleItem[];
	total: number;
}

interface RecentArticleItem {
	id: number;
	author: string;
	title: string;
	summary: string;
	content: string;
	createAt: string;
	updateAt: string;
}
