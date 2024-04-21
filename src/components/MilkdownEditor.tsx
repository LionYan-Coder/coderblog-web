'use client';
import { Editor, editorViewOptionsCtx, rootCtx } from '@milkdown/core';
import { nord } from '@milkdown/theme-nord';
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react';
import { commonmark } from '@milkdown/preset-commonmark';
import '~/assets/themes/tailwind.scss';
import '~/assets/themes/tailwind-dark.scss';
import { useTheme } from 'next-themes';
export function MilkdownEditor() {
	const { resolvedTheme } = useTheme();
	useEditor(
		(root) =>
			Editor.make()
				.config((ctx) => {
					ctx.update(editorViewOptionsCtx, (prev) => ({
						...prev,
						attributes: { class: `milkdown-theme-${resolvedTheme}` }
					}));
					ctx.set(rootCtx, root);
				})
				.config(nord)
				.use(commonmark),
		[resolvedTheme]
	);

	return <Milkdown />;
}

export function MilkdownEditorWrapper() {
	return (
		<MilkdownProvider>
			<MilkdownEditor />
		</MilkdownProvider>
	);
}
