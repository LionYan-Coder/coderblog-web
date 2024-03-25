import ArrowUpRight from '../icon/arrow-up-right';
import Image from 'next/image';
import Tag from '../tag';
import dayjs from 'dayjs';

export default function Article({ article }: { article: Article }) {
	return (
		<div className="flex-1 relative overflow-hidden mb-9">
			<Image
				src={`${article.coverUrl}?random=${article.id}`}
				alt={article.title}
				height={228}
				width={1000}
				className="w-full"
			/>
			<div className="text-purple-800 font-medium text-sm mb-3 mt-6">
				<span className="capitalize">{article.author}</span>
				<span className="mx-[2px]">,</span>
				<span className="align-text-top">
					{dayjs(article.updateAt).format('DD/MM/YYYY')}
				</span>
			</div>
			<div className="group flex justify-between items-start mb-3 cursor-pointer hover:underline underline-offset-2">
				<span className="font-semibold text-2xl">{article.title}</span>
				<ArrowUpRight className="text-2xl transform transition-transform ease-in group-hover:-translate-y-1 group-hover:translate-x-1" />
			</div>
			<p className="line-clamp-3 text-neutral-600 text-base mb-6">
				{article.summary}
			</p>
			<div className="flex space-x-2">
				{article.tags.map((tag) => (
					<Tag text={tag} key={tag} />
				))}
			</div>
		</div>
	);
}
