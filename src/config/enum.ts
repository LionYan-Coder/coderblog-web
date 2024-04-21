export enum EContentType {
	// json
	JSON = 'application/json;charset=UTF-8',
	// json
	TEXT = 'text/plain;charset=UTF-8',
	// form-data 一般配合qs
	FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
	// form-data  上传
	FORM_DATA = 'multipart/form-data;charset=UTF-8'
}

export enum EResponseType {
	json = 'json',
	blob = 'blob',
	text = 'text',
	arrayBuffer = 'arrayBuffer',
	formData = 'formData'
}

export enum EResponseCode {
	success = 0
}
