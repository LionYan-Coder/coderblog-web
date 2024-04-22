import * as React from 'react';
import { type ReactNode } from 'react';
import { Sidebar } from '~/app/admin/_components/sidebar';
import { Header } from '~/app/admin/_components/header';
import { ClientOnly, Toaster } from '~/components';

export default function AdminLayout({ children }: { children: ReactNode }) {
	return (
		<div className="min-h-screen w-full bg-muted/40">
			<Sidebar />
			<div className="flex flex-col sm:py-4 sm:pl-14">
				<Header />
				<main className="p-4">{children}</main>
			</div>
			<ClientOnly>
				<Toaster />
			</ClientOnly>
		</div>
	);
}
