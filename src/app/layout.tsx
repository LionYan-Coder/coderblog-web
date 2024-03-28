import type { Metadata } from 'next';
import './globals.css';
import { sansFont } from '~/lib/font';
import { ThemeProvider } from '~/provider/theme';

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
	);
}
