import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState
} from 'react';

export function useEditor() {
	const [defaultValue, setDefaultValue] = useState('');
	const [value, setValue] = useState('');

	useEffect(() => {
		setValue(defaultValue);
	}, [defaultValue]);

	return useMemo(
		() => ({
			value,
			setValue,
			defaultValue,
			setDefaultValue
		}),
		[value, defaultValue]
	);
}

export const EditorContext = createContext<ReturnType<typeof useEditor> | null>(
	null
);

export const useEditorContext = () => {
	const context = useContext(EditorContext);

	if (context == null) {
		throw new Error('_components must be wrapped in AppContext');
	}

	return context;
};
