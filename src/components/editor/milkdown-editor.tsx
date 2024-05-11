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
import { Milkdown, useEditor } from '@milkdown/react';
import { commonmark } from '@milkdown/preset-commonmark';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { clipboard } from '@milkdown/plugin-clipboard';
import { history } from '@milkdown/plugin-history';
import { prism } from '@milkdown/plugin-prism';
import { indent } from '@milkdown/plugin-indent';
import { useTheme } from 'next-themes';

import '~/assets/themes/tailwind.scss';
import '~/assets/themes/tailwind-dark.scss';
import { CommandSlashCard, slash } from '~/components/editor/plugins/slash';
import { usePluginViewFactory } from '@prosemirror-adapter/react';
import { useEffect } from 'react';
import { Slice } from 'prosemirror-model';
import { Spin } from '~/components';

interface EditorProps {
	value?: string;
	onChange?: (value: string) => void;
}

export function MarkdownEditor({ value, onChange }: EditorProps) {
	const { resolvedTheme } = useTheme();
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
							onChange?.(markdown);
						});
					ctx.set(rootCtx, root);
					console.log('value', value);
					ctx.set(defaultValueCtx, value || '');
				})
				.config(nord)
				.use(commonmark)
				.use(clipboard)
				.use(listener)
				.use(prism)
				.use(indent)
				.use(history)
				.use(slash),
		[resolvedTheme, value]
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

	// useEffect(() => {
	// 	if (editor.loading) {
	// 		return;
	// 	}
	// 	editor.get()?.action((ctx) => {
	// 		const view = ctx.get(editorViewCtx);
	// 		const parser = ctx.get(parserCtx);
	// 		const doc = parser(value || '');
	// 		if (!doc) {
	// 			return;
	// 		}
	// 		const state = view.state;
	// 		view.dispatch(
	// 			state.tr.replace(
	// 				0,
	// 				state.doc.content.size,
	// 				new Slice(doc.content, 0, 0)
	// 			)
	// 		);
	// 	});
	// }, [value]);
	return (
		<Spin spinning={editor.loading}>
			<div className="min-h-96 max-h-[800px] bg-[url('/grid-black.svg')] dark:bg-[url('/grid.svg')] bg-top bg-repeat px-3 py-4 border overflow-auto">
				<Milkdown />
			</div>
		</Spin>
	);
}
