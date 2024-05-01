'use client';

import {
	defaultValueCtx,
	Editor,
	editorViewCtx,
	editorViewOptionsCtx,
	parserCtx,
	rootCtx
} from '@milkdown/core';
import { nord } from '@milkdown/theme-nord';
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react';
import { commonmark } from '@milkdown/preset-commonmark';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { clipboard } from '@milkdown/plugin-clipboard';
import { history } from '@milkdown/plugin-history';
import { prism } from '@milkdown/plugin-prism';
import { indent } from '@milkdown/plugin-indent';
import { useTheme } from 'next-themes';
import { useEditorContext } from '~/hooks/useEditor';

import '~/assets/themes/tailwind.scss';
import '~/assets/themes/tailwind-dark.scss';
import { CommandSlashCard, slash } from '~/components/editor/plugins/slash';
import {
	ProsemirrorAdapterProvider,
	usePluginViewFactory
} from '@prosemirror-adapter/react';
import { useEffect } from 'react';
import { Slice } from 'prosemirror-model';
import { Spin } from '~/components';

export function MilkdownEditor() {
	const { resolvedTheme } = useTheme();
	const { defaultValue, setValue } = useEditorContext();
	const pluginViewFactory = usePluginViewFactory();
	const editor = useEditor(
		(root) =>
			Editor.make()
				.config((ctx) => {
					ctx.update(editorViewOptionsCtx, (prev) => ({
						...prev,
						attributes: { class: `milkdown-theme-${resolvedTheme}` }
					}));
					ctx
						.get(listenerCtx)
						.markdownUpdated((_ctx, markdown, prevMarkdown) => {
							setValue(markdown);
						});
					ctx.set(rootCtx, root);
					console.log('set defaultValue', defaultValue);
					ctx.set(defaultValueCtx, defaultValue);
				})
				.config(nord)
				.use(commonmark)
				.use(clipboard)
				.use(listener)
				.use(prism)
				.use(indent)
				.use(history)
				.use(slash),
		[resolvedTheme, defaultValue]
	);

	useEffect(() => {
		if (!editor.loading) {
			editor.get()?.ctx.set(slash.key, {
				view: pluginViewFactory({
					component: CommandSlashCard
				})
			});
		}
	}, [editor.loading]);

	useEffect(() => {
		if (editor.loading) {
			return;
		}
		if (editor.get()) {
			console.log('defaultValue', defaultValue);
			editor.get()?.action((ctx) => {
				const view = ctx.get(editorViewCtx);
				const parser = ctx.get(parserCtx);
				const doc = parser(defaultValue || '');
				if (!doc) {
					return;
				}
				const state = view.state;
				view.dispatch(
					state.tr.replace(
						0,
						state.doc.content.size,
						new Slice(doc.content, 0, 0)
					)
				);
			});
		}
	}, [defaultValue]);

	return (
		<Spin spinning={editor.loading}>
			<div className="min-h-96 max-h-[800px] bg-[url('/grid-black.svg')] dark:bg-[url('/grid.svg')] bg-top bg-repeat px-3 py-4 border overflow-auto">
				<Milkdown />
			</div>
		</Spin>
	);
}

export function MilkdownEditorWrapper() {
	return (
		<MilkdownProvider>
			<ProsemirrorAdapterProvider>
				<MilkdownEditor />
			</ProsemirrorAdapterProvider>
		</MilkdownProvider>
	);
}
