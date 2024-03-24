import ArrowUpRight from '@/app/_components/icon/arrow-up-right';
import { ImgUrl } from '@/app/_utils/constants';
import { EResponseCode } from '@/app/_utils/enum';
import http from '@/app/_utils/network';
import Image from 'next/image';

async function getRecentArticle() {
	const { code, data, message } = await http<RecentArticleRes>(
		'/article/currentMonth'
	);
	if (code !== EResponseCode.success) {
		throw new Error(message);
	}
	console.log('recnet blog data', data);

	return data;
}
export default async function RecentPost() {
	const { total, list } = await getRecentArticle();
	return (
		<section className="px-4">
			<h4 className="my-8">Recent blog posts</h4>
			{total > 0 ? (
				<div className="flex flex-col">
					{list.map((article, i) => (
						<div
							key={article.id}
							className="flex-1 relative overflow-hidden mb-9"
						>
							<Image
								src={ImgUrl + `/2560/1440/?radom=${i}`}
								alt={article.title}
								height={228}
								width={1000}
								className="w-full"
							/>
							<p className="text-purple-800 font-medium text-sm mb-3 mt-6">
								{article.updateAt}
							</p>
							<div className="group flex justify-between items-center mb-3 cursor-pointer hover:underline underline-offset-2">
								<span className="font-semibold text-2xl truncate">
									{article.title}
								</span>
								<ArrowUpRight className="text-2xl transform transition-transform ease-in group-hover:-translate-y-1 group-hover:translate-x-1" />
							</div>
							<p className="line-clamp-3 text-neutral-600 text-base">
								{article.summary}
							</p>
						</div>
					))}
				</div>
			) : (
				<p>近期没有文章...</p>
			)}
		</section>
	);
}
