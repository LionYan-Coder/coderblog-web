'use client';
import { Card, Separator } from '~/components';
import {
	BulletedListIcon,
	CalloutIcon,
	CodeIcon,
	DividerIcon,
	FileIcon,
	Heading1Icon,
	Heading2Icon,
	Heading3Icon,
	Heading4Icon,
	Heading5Icon,
	Heading6Icon,
	ImageIcon,
	ListTodoIcon,
	NumberedListIcon,
	QuoteIcon,
	TableIcon,
	TextIcon,
	ToggleListIcon,
	VideoIcon
} from '~/assets/icons/editor';
import { ReactNode, useCallback, useEffect, useRef, MouseEvent } from 'react';
import { slashFactory, SlashProvider } from '@milkdown/plugin-slash';
import { useInstance } from '@milkdown/react';
import { usePluginViewContext } from '@prosemirror-adapter/react';
import { Ctx } from '@milkdown/ctx';
import { CmdKey, editorViewCtx } from '@milkdown/core';
import { callCommand } from '@milkdown/utils';
import {
	createCodeBlockCommand,
	insertHardbreakCommand,
	insertImageCommand,
	toggleEmphasisCommand,
	turnIntoTextCommand,
	wrapInBulletListCommand,
	wrapInHeadingCommand,
	wrapInOrderedListCommand
} from '@milkdown/preset-commonmark';

interface Block {
	text: string;
	icon: ReactNode;
	key?: CmdKey<any>;
	payload?: any;
}

const BasicBlockList: Block[] = [
	{ text: 'Text', icon: <TextIcon />, key: turnIntoTextCommand.key },
	{ text: 'To-do list', icon: <ListTodoIcon /> },
	{
		text: 'Heading 1',
		icon: <Heading1Icon />,
		key: wrapInHeadingCommand.key,
		payload: 1
	},
	{
		text: 'Heading 2',
		icon: <Heading2Icon />,
		key: wrapInHeadingCommand.key,
		payload: 2
	},
	{
		text: 'Heading 3',
		icon: <Heading3Icon />,
		key: wrapInHeadingCommand.key,
		payload: 3
	},
	{
		text: 'Heading 4',
		icon: <Heading4Icon />,
		key: wrapInHeadingCommand.key,
		payload: 4
	},
	{
		text: 'Heading 5',
		icon: <Heading5Icon />,
		key: wrapInHeadingCommand.key,
		payload: 5
	},
	{
		text: 'Heading 6',
		icon: <Heading6Icon />,
		key: wrapInHeadingCommand.key,
		payload: 6
	},
	{ text: 'Table', icon: <TableIcon /> },
	{
		text: 'Bulleted list',
		icon: <BulletedListIcon />,
		key: wrapInBulletListCommand.key
	},
	{
		text: 'Numbered list',
		icon: <NumberedListIcon />,
		key: wrapInOrderedListCommand.key
	},
	{ text: 'Toggle list', icon: <ToggleListIcon /> },
	{ text: 'Quote', icon: <QuoteIcon />, key: toggleEmphasisCommand.key },
	{ text: 'Divider', icon: <DividerIcon />, key: insertHardbreakCommand.key },
	{ text: 'Callout', icon: <CalloutIcon /> }
];

const MediaBlocksList: Block[] = [
	{ text: 'Image', icon: <ImageIcon />, key: insertImageCommand.key },
	{ text: 'Video', icon: <VideoIcon /> },
	{ text: 'Code', icon: <CodeIcon />, key: createCodeBlockCommand.key },
	{ text: 'file', icon: <FileIcon /> }
];

export const slash = slashFactory('Commands');

export function CommandSlashCard() {
	const ref = useRef<HTMLDivElement>(null);
	const slashProvider = useRef<SlashProvider>();
	const { view, prevState } = usePluginViewContext();
	const [loading, get] = useInstance();
	const action = useCallback(
		(fn: (ctx: Ctx) => void) => {
			if (loading) return;
			get().action(fn);
		},
		[loading]
	);
	useEffect(() => {
		const div = ref.current;
		if (loading || !div) {
			return;
		}
		slashProvider.current = new SlashProvider({
			content: div,
			tippyOptions: {
				onMount(_) {
					ref.current?.focus();
				}
			}
		});
		return () => {
			slashProvider.current?.destroy();
		};
	}, [loading]);

	useEffect(() => {
		slashProvider.current?.update(view, prevState);
	});

	const command = (e: MouseEvent<any>, key?: CmdKey<any>, payload?: any) => {
		e.preventDefault();
		if (key) {
			action((ctx) => {
				const view = ctx.get(editorViewCtx);
				const { dispatch, state } = view;
				const { tr, selection } = state;
				const { from } = selection;
				dispatch(tr.deleteRange(from - 1, from));
				view.focus();
				return callCommand(key, payload)(ctx);
			});
		}
	};

	return (
		<Card ref={ref}>
			<Card.Content className="p-0 max-h-96 w-[340px] overflow-y-auto">
				<p className="text-muted-foreground pl-4 pb-2 pt-3 text-sm">
					Basic blocks
				</p>
				<CommandBlocks blocks={BasicBlockList} onClick={command} type="basic" />
				<Separator className="my-2" />
				<p className="text-muted-foreground pl-4 pb-2 pt-3 text-sm">
					Media blocks
				</p>
				<CommandBlocks
					blocks={MediaBlocksList}
					onClick={command}
					type="media"
				/>
			</Card.Content>
		</Card>
	);
}

function CommandBlocks({
	blocks,
	onClick,
	type
}: {
	blocks: Block[];
	onClick: (e: MouseEvent<any>, key?: CmdKey<any>, payload?: any) => void;
	type: 'basic' | 'media';
}) {
	return (
		<ul className="px-2">
			{blocks.map((block, index) => (
				<li
					key={block.text}
					tabIndex={
						type === 'basic' ? index + 1 : BasicBlockList.length + index + 1
					}
					className="px-2 py-1 my-1 cursor rounded flex items-center text-base text-accent-foreground transition-colors bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
					onClick={(e) => onClick(e, block.key, block.payload)}
				>
					<span className="mr-3">{block.icon}</span>
					<span>{block.text}</span>
				</li>
			))}
		</ul>
	);
}
