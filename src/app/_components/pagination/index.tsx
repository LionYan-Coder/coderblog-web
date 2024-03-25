import Link from 'next/link';
import { ArrowLeft, ArrowRight } from '../icon';
import classNames from 'classnames';

interface PaginationProps {
	total: number;
	size: number;
	curPage: number;
	hash?: string;
}
const cls2 =
	'flex items-center py-[10px] px-4 rounded-xl bg-transparent text-sm font-medium text-neutral-600 hover:bg-[#F9F5FF] hover:text-[#7F56D9] active:bg-[#F9F5FF] active:text-[#7F56D9] transition-colors';

const cls1 = classNames(
	'flex items-center py-[10px] px-4 rounded-lg bg-transparent text-sm font-medium text-neutral-600 active:opacity-75 hover:opacity-75 transition-opacity'
);

export default function Pagination({
	total,
	curPage,
	hash,
	size
}: PaginationProps) {
	function getCls2(page: number) {
		const cls = classNames(cls2, 'my-[10px]', {
			'bg-[#F9F5FF] text-[#7F56D9]': page === curPage
		});
		return cls;
	}

	const totalPage = Math.ceil(total / size);

	return (
		<div className="w-full flex flex-col items-center justify-center">
			<Link
				href={{ query: { page: curPage - 1 <= 1 ? 1 : curPage - 1 }, hash }}
				scroll={false}
				legacyBehavior
			>
				<a
					className={classNames(cls1, {
						'cursor-not-allowed': curPage - 1 <= 1
					})}
				>
					<ArrowLeft className="mr-3" />
					<span>Previous</span>
				</a>
			</Link>
			<div className="flex justify-center space-x-[2px]  px-4 w-full flex-nowrap overflow-hidden">
				{Array.from({ length: totalPage }, (_, index) => index + 1).map((n) => (
					<Link
						key={n}
						href={{ query: { page: n }, hash }}
						className={getCls2(n)}
						scroll={false}
					>
						{n}
					</Link>
				))}
			</div>
			<Link
				href={{
					query: { page: curPage + 1 > totalPage ? totalPage : curPage + 1 },
					hash
				}}
				scroll={false}
				legacyBehavior
			>
				<a
					className={classNames(cls1, {
						'cursor-not-allowed': curPage + 1 >= totalPage
					})}
				>
					<span>Next</span>
					<ArrowRight className="ml-3" />
				</a>
			</Link>
		</div>
	);
}
