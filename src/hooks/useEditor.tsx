import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState
} from 'react';

export function useEditorState() {
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
