import { ReactNode } from 'react';

interface Props {
	banner: ReactNode;
	recentpost: ReactNode;
	children: ReactNode;
}
export default function HomeLayout({ recentpost, banner, children }: Props) {
	return (
		<>
			{banner}
			{recentpost}
			{children}
		</>
	);
}
