'use client';
import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import { LogoIcon } from '~/assets';

interface IMenuChildrenProps {
	menuActive: boolean;
	onChange?: (active: boolean) => void;
}

export default function Header() {
	const [menuActive, setMenuActive] = useState(false);
	return (
		<div
			id="header"
			className="sticky top-0 left-0 right-0 z-10 backdrop-blur-md bg-gradient-light"
		>
			<div className="border-b border-neutral-400 relative">
				<div className="max-w-screen-desktop px-6 py-5 desktop:px-10">
					<div className="flex items-center">
						<Logo />
						<Menu menuActive={menuActive} />
					</div>
				</div>
				<BreadMenu
					menuActive={menuActive}
					onChange={(active) => setMenuActive(active)}
				/>
			</div>
		</div>
	);
}

function BreadMenu({ menuActive, onChange }: IMenuChildrenProps) {
	const [touch, setTouch] = useState(false);
	function getCls(index: number) {
		const cls = clsx(
			'h-[2px] w-full bg-neutral-900 transform transition-transform',
			{
				[index === 0 ? 'translate-y-[5px]' : '-translate-y-[5px]']: menuActive,
				[index === 0 ? '-rotate-45' : 'rotate-45']: menuActive
			}
		);

		return cls;
	}

	const curtainCls = clsx(
		'fixed h-d-screen w-d-screen z-50 inset-0  backdrop-filter desktop:hidden',
		touch ? 'blur-[20px]' : 'blur-none',
		touch ? 'visible' : 'invisible',
		touch ? 'opacity-100' : 'opacity-0'
	);

	useEffect(() => {
		if (touch) {
			setTimeout(() => {
				setTouch(false);
			}, 100);
		}
	}, [touch]);

	return (
		<>
			<div
				className="absolute z-[99] right-0 top-0 w-12 h-full cursor-pointer flex items-center justify-center  desktop:hidden"
				onClick={() => {
					onChange?.(!menuActive);
					if (!menuActive) {
						setTouch(true);
					}
				}}
			>
				<div className="w-5 z-20 flex flex-col items-center space-y-2">
					{Array.from({ length: 2 }, (_, index) => index).map((index) => (
						<span key={index} className={getCls(index)}></span>
					))}
				</div>
			</div>
			<div
				className={curtainCls}
				style={{
					transition: 'all .24s cubic-bezier(.4,0,.6,1) 40ms',
					backgroundColor: 'rgba(232,232,237,.4)'
				}}
			></div>
		</>
	);
}
function Logo() {
	return (
		<div className="flex items-center">
			<LogoIcon className="text-4xl" />
			<span className="ml-1 mt-1 text-2xl font-medium font-mono">Coder</span>
		</div>
	);
}

const menus = ['Blog', 'Projects', 'About', 'Newsletter'];
function Menu({ menuActive }: IMenuChildrenProps) {
	const menuContentCls = clsx(
		'absolute desktop:relative top-0 left-0 w-full overflow-hidden max-w-5xl pointer-events-auto desktop:h-full',
		menuActive ? 'bg-neutral-50' : 'bg-transparent',
		menuActive ? 'h-d-screen' : 'h-full'
	);
	const menuItemCls = clsx(
		'transform opacity-0 desktop:opacity-100 desktop:visible desktop:translate-y-0',
		{ 'opacity-100': menuActive },
		menuActive ? 'visible' : 'invisible',
		menuActive ? 'translate-y-0' : ' -translate-y-2'
	);
	return (
		<div
			className={menuContentCls}
			style={{
				transition:
					'background 422ms cubic-bezier(.4,0,.6,1) 80ms,height 340ms cubic-bezier(.4,0,.6,1) 40ms'
			}}
		>
			<ul className="relative z-[1] w-auto h-full pt-14 desktop:pt-0 flex flex-col desktop:flex-row  items-center justify-center desktop:justify-end space-y-9 desktop:space-y-0 desktop:space-x-14 text-gray-800 font-semibold desktop:font-normal text-2xl desktop:text-xl">
				{menus.map((item, index) => (
					<li
						key={item}
						className={menuItemCls}
						style={{
							transitionDelay: `calc(0.2s + ${index} * 20ms)`,
							transitionDuration: '0.24s',
							transitionProperty: 'opacity, transform, visibility',
							transitionTimingFunction:
								'cubic-bezier(.4,0,.6,1), cubic-bezier(.4,0,.6,1), step-start'
						}}
					>
						{item}
					</li>
				))}
				<li
					className={menuItemCls}
					style={{
						transitionDelay: `calc(0.2s + ${menus.length} * 20ms)`,
						transitionDuration: '0.24s',
						transitionProperty: 'opacity, transform, visibility',
						transitionTimingFunction:
							'cubic-bezier(.4,0,.6,1), cubic-bezier(.4,0,.6,1), step-start'
					}}
				></li>
			</ul>
		</div>
	);
}
