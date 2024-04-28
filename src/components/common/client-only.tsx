'use client';
import { useEffect, useState } from 'react';

export function ClientOnly({ children }: { children: JSX.Element }) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return children;
}
