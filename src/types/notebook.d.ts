interface NotebookListRes {
	list?: Notebook[];
	total: number;
	page: number;
	size: number;
}

interface NotebookListReq {
	page?: number;
	size?: number;
}

interface RecentNotebookRes {
	list: Notebook[];
	total: number;
}

interface Notebook {
	id: number;
	author: string;
	title: string;
	summary: string;
	content: string;
	tags: string[];
	createAt: string;
	updateAt: string;
	published: boolean;
}

interface CreateNotebookReq {
	title: string;
	summary?: string;
	content?: string;
	tags?: string[];
}

interface UpdateNotebookReq extends CreateNotebookReq {}

interface CreateNotebookRes {
	id: number;
}
