'use client';

import {
	defaultValueCtx,
	Editor,
	editorViewOptionsCtx,
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
					ctx.set(rootCtx, root);
					ctx.set(defaultValueCtx, defaultValue);
					ctx.set(slash.key, {
						view: pluginViewFactory({
							component: CommandSlashCard
						})
					});
					ctx
						.get(listenerCtx)
						.markdownUpdated((_ctx, markdown, prevMarkdown) => {
							setValue(markdown);
						});
				})
				.config(nord)
				.use(commonmark)
				.use(clipboard)
				.use(listener)
				.use(prism)
				.use(indent)
				.use(history)
				.use(slash),
		[resolvedTheme]
	);

	return <Milkdown />;
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
