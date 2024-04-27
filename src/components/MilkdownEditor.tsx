'use client';
import {
	defaultValueCtx,
	Editor,
	editorViewCtx,
	editorViewOptionsCtx,
	rootCtx,
	serializerCtx
} from '@milkdown/core';
import { nord } from '@milkdown/theme-nord';
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react';
import { commonmark } from '@milkdown/preset-commonmark';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { clipboard } from '@milkdown/plugin-clipboard';
import { history } from '@milkdown/plugin-history';
import { prism } from '@milkdown/plugin-prism';
import { indent } from '@milkdown/plugin-indent';
import '~/assets/themes/tailwind.scss';
import '~/assets/themes/tailwind-dark.scss';
import { useTheme } from 'next-themes';
import { useMemo } from 'react';
import { useEditorContext } from '~/hooks/useEditor';

export function MilkdownEditor() {
	const { resolvedTheme } = useTheme();
	const { defaultValue, setValue } = useEditorContext();
	const editor = useEditor(
		(root) =>
			Editor.make()
				.config((ctx) => {
					ctx.update(editorViewOptionsCtx, (prev) => ({
						...prev,
						attributes: { class: `milkdown-theme-${resolvedTheme}` }
					}));
					ctx.set(rootCtx, root);
					ctx.set(defaultValueCtx, defaultValue);
					ctx
						.get(listenerCtx)
						.markdownUpdated((_ctx, markdown, prevMarkdown) => {
							console.log('markdown', markdown);
							setValue(markdown);
						});
				})
				.config(nord)
				.use(commonmark)
				.use(commonmark)
				.use(clipboard)
				.use(listener)
				.use(prism)
				.use(indent)
				.use(history),
		[resolvedTheme]
	);

	const getContent = useMemo(() => {
		return editor.get()?.action((ctx) => {
			const editorView = ctx.get(editorViewCtx);
			const serializer = ctx.get(serializerCtx);
			return serializer(editorView.state.doc);
		});
	}, [editor]);

	return <Milkdown />;
}

export function MilkdownEditorWrapper() {
	return (
		<MilkdownProvider>
			<MilkdownEditor />
		</MilkdownProvider>
	);
}
