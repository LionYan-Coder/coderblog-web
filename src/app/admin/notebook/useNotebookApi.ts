import { EResponseCode } from '~/config/enum';
import { useHttp } from '~/http';
import { toast } from '~/components';

export function useNotebookApi() {
	const { http } = useHttp();
	async function fetchCreateNotebook(params: CreateNotebookReq) {
		const { code, data, message } = await http<CreateNotebookRes>(
			'/admin/notebook',
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

	async function fetchUpdateNotebook(id: number, params: UpdateNotebookReq) {
		const { code, data, message } = await http(
			'/admin/notebook/' + id,
			'POST',
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

	async function fetchDeleteNotebook(id: number) {
		const { code, data, message } = await http(
			'/admin/notebook/' + id,
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

	async function fetchNotebookDetail(id: number) {
		const { code, data, message } = await http<Notebook>(
			`/admin/notebook/${id}`,
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
	async function fetchPublishNotebook(id: number, publish: boolean) {
		const { code, data, message } = await http<Notebook>(
			`/admin/notebook/${publish ? 'publish' : 'unpublish'}/${id}`,
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

	async function fetchNotebookList(params?: NotebookListReq) {
		const { code, data, message } = await http<NotebookListRes>(
			'/admin/notebook',
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
		fetchCreateNotebook,
		fetchUpdateNotebook,
		fetchDeleteNotebook,
		fetchPublishNotebook,
		fetchNotebookDetail,
		fetchNotebookList
	};
}
