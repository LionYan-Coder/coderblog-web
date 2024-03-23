'use client';

import { useAppContext } from '@/app/hooks/useAppContext';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

function BreadMenu() {
	const { menuTriggerActive, setMenuTriggerActive } = useAppContext();
	const [touch, setTouch] = useState(false);
	function getCls(index: number) {
		const cls = classNames(
			'h-[2px] w-full bg-neutral-900 transform transition-transform',
			{
				[index === 0 ? 'translate-y-[5px]' : '-translate-y-[5px]']:
					menuTriggerActive,
				[index === 0 ? '-rotate-45' : 'rotate-45']: menuTriggerActive
			}
		);

		return cls;
	}

	const curtainCls = classNames(
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
					setMenuTriggerActive(!menuTriggerActive);
					if (!menuTriggerActive) {
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

export default BreadMenu;
