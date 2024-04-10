import type { Metadata } from 'next';
import './globals.css';
import './clerk.css';
import { sansFont } from '~/lib/font';
import { ThemeProvider } from '~/provider/theme';
import { ClerkProvider } from '@clerk/nextjs';
import { zhCN } from '~/lib/clerkLocalizations';

export const metadata: Metadata = {
	title: 'Lion Yan | Developer',
	description: '我叫Lion，一名开发者，热爱技术同时也是一名猫奴。'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider localization={zhCN}>
			<html
				lang="zh-CN"
				className={`${sansFont.variable} m-0 p-0 h-full font-sans antialiased`}
				suppressHydrationWarning
			>
				<body className="flex h-full flex-col">
					<ThemeProvider defaultTheme="system" attribute="class" enableSystem>
						{children}
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
