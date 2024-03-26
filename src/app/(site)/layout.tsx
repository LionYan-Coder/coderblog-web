import { ReactNode } from 'react';
import Header from './Header';

export default function SiteLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<div className="pointer-events-none fixed inset-0 select-none bg-[url('/grid-black.svg')] bg-top bg-repeat dark:bg-[url('/grid.svg')]" />
			<span className="pointer-events-none fixed top-0 block h-[800px] w-full select-none bg-[radial-gradient(103.72%_46.58%_at_50%_0%,rgba(5,5,5,0.045)_0%,rgba(0,0,0,0)_100%)] dark:bg-[radial-gradient(103.72%_46.58%_at_50%_0%,rgba(255,255,255,0.09)_0%,rgba(255,255,255,0)_100%)]" />

			<div className="relative text-zinc-800 dark:text-zinc-200">
				<Header />
				<main>{children}</main>
			</div>
		</>
	);
}
