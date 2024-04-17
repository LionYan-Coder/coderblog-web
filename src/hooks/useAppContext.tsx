'use client';

import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState
} from 'react';

function useAppState() {
	const [menuTriggerActive, setMenuTriggerActive] = useState(false);
	const [theme, setTheme] = useState<'nigth' | 'day'>('day');
	useEffect(() => {
		if (menuTriggerActive) {
			document.body.classList.add('noscroll');
		} else {
			document.body.classList.remove('noscroll');
		}
	}, [menuTriggerActive]);

	return useMemo(
		() => ({ menuTriggerActive, setMenuTriggerActive, theme, setTheme }),
		[menuTriggerActive, theme]
	);
}

const AppStateContext = createContext<ReturnType<typeof useAppState> | null>(
	null
);

export const useAppContext = () => {
	const context = useContext(AppStateContext);

	if (context == null) {
		throw new Error('_components must be wrapped in AppContext');
	}

	return context;
};

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
	const context = useAppState();
	return (
		<AppStateContext.Provider value={context}>
			{children}
		</AppStateContext.Provider>
	);
};
