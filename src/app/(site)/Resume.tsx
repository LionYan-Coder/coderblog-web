'use client';

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Mouse } from '~/components/ui';

const variants = {
	initial: { opacity: 0 },
	animate: {
		opacity: 1,
		transition: {
			type: 'spring',
			staggerChildren: 0.3
		}
	}
};

const variantItm = {
	initial: { opacity: 0, y: '100%' },
	animate: {
		opacity: 1,
		y: 0
	}
};
export default function Resume() {
	return (
		<motion.div
			variants={variants}
			initial="initial"
			animate="animate"
			className="relative w-full h-[calc(100vh-64px)] grid gap-3 place-content-center text-2xl"
		>
			<motion.p variants={variantItm}>
				你好，我是
				<span className="text-amber-800 text-3xl font-semibold dark:drop-shadow-[0_0_0.3rem_#92400E70]">
					{' '}
					Lion{' '}
				</span>
				👋。
			</motion.p>
			<motion.p className="group" variants={variantItm}>
				<TypeAnimation
					className="text-2xl font-medium"
					sequence={[
						300,
						'一名全栈开发工程师 。',
						2000,
						'A Full Stack <Developer /> .',
						5000
					]}
					speed={10}
					repeat={Infinity}
				/>
			</motion.p>
			<motion.p variants={variantItm}>
				热爱编码，喜欢{' '}
				<span className="text-[#294E80] font-semibold dark:drop-shadow-[0_0_0.3rem_#294E8070]">
					TypeScript、
				</span>{' '}
				<span className="text-[#0871A4] font-semibold dark:drop-shadow-[0_0_0.3rem_#0871A470]">
					React、
				</span>
				<span className="text-[#42b883] font-semibold dark:drop-shadow-[0_0_0.3rem_#42b88370]">
					Vue、
				</span>{' '}
				<span className="text-[#0468d7] font-semibold dark:drop-shadow-[0_0_0.3rem_#0468d770]">
					Flutter
				</span>{' '}
				和{' '}
				<span className="text-[#5dc9e2] font-semibold dark:drop-shadow-[0_0_0.3rem_#5dc9e270]">
					Go
				</span>
			</motion.p>
			<motion.p variants={variantItm}>
				<TypeAnimation
					className="text-sm text-zinc-500 dark:text-zinc-200"
					sequence={[
						1200,
						'写这个博客在这里记录我的学习与生活，并且分享有趣或者有用知识，努力成为更厉害的coder💪。'
					]}
					speed={10}
					repeat={Infinity}
				/>
			</motion.p>
			<div className="absolute left-1/2 transform -trnaslate-x-1/2 bottom-5">
				<Mouse />
			</div>
		</motion.div>
	);
}
