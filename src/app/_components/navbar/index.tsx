import Logo from './logo';
import BreadMenu from './bread';
import Menu from './menu';

function Header() {
	return (
		<div
			id="header"
			className="sticky top-0 left-0 right-0 z-10 backdrop-blur-md bg-gradient-light"
		>
			<div className="border-b border-neutral-400 relative">
				<div className="max-w-screen-desktop px-6 py-5 desktop:px-10">
					<div className="flex items-center">
						<Logo />
						<Menu />
					</div>
				</div>
				<BreadMenu />
			</div>
		</div>
	);
}

export default Header;
