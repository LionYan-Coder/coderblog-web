import Mouse from '@/app/_components/mouse';
import { EResponseCode } from '@/app/_utils/enum';
import http from '@/app/_utils/network';
import Image from 'next/image';
async function fetchCurrentMonthBanner() {
	const { code, data, message } = await http<CurrentMonthBannerRes>(
		'/banner/currentMonth',
		'GET',
		{ fetchInit: { cache: 'no-store' } }
	);
	if (code !== EResponseCode.success) {
		throw new Error(message);
	}
	console.log('banner data', data);

	return data;
}

export default async function Banner() {
	const banner = await fetchCurrentMonthBanner();

	return (
		<section>
			<div className="w-full h-[32rem] relative">
				<Image
					src={banner.coverURL}
					alt={banner.title}
					style={{ objectFit: 'cover' }}
					sizes="100vw"
					fill
				/>
				<div className="w-full text-white absolute top-1/2 transform -trnaslate-y-1/2 p-4">
					<p className="text-center text-4xl mb-4">{banner.title}</p>
					<p className="text-center text-lg">{banner.info}</p>
				</div>
				<div className="w-full absolute bottom-8 flex justify-center">
					<Mouse />
				</div>
			</div>
		</section>
	);
}
