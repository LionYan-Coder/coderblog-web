export function isAsyncFunc(func: any): boolean {
	return func[Symbol.toStringTag] === 'AsyncFunction';
}
