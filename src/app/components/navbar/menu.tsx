'use client';

import { useAppContext } from '@/app/hooks/useAppContext';
import classNames from 'classnames';
import Switch from './switch';
const menus = ['Blog', 'Projects', 'About', 'Newsletter'];
function Menu() {
	const { menuTriggerActive, theme, setTheme } = useAppContext();

	const menuContentCls = classNames(
		'absolute desktop:relative top-0 left-0 w-full overflow-hidden max-w-5xl pointer-events-auto desktop:h-full',
		menuTriggerActive ? 'bg-neutral-50' : 'bg-transparent',
		menuTriggerActive ? 'h-d-screen' : 'h-full'
	);
	const menuItemCls = classNames(
		'transform opacity-0 desktop:opacity-100 desktop:visible desktop:translate-y-0',
		{ 'opacity-100': menuTriggerActive },
		menuTriggerActive ? 'visible' : 'invisible',
		menuTriggerActive ? 'translate-y-0' : ' -translate-y-2'
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
				>
					<Switch
						onClick={() => setTheme(theme === 'day' ? 'nigth' : 'day')}
						night={theme === 'nigth'}
					/>
				</li>
			</ul>
		</div>
	);
}

export default Menu;
