import Image from 'next/image';
import { GITHUB } from '~/config/constants';

// async function fetchGitHubUser(): Promise<GitHubUser | null> {
// 	let headers: HeadersInit = {
// 		Authorization: 'Bearer ' + process.env.GIT_TOKEN
// 	};
// 	return fetch(GITHUB.API_URL + '/user', { headers: headers })
// 		.then((res) => {
// 			if (res.ok) {
// 				return res.json();
// 			} else {
// 				return null;
// 			}
// 		})
// 		.catch((err) => {
// 			Error(err);
// 		});
// }

export default async function GitHubUser() {
	// const res = await fetchGitHubUser();

	return (
		<Image
			src={GITHUB.DEFAULLT_AVATAR}
			width={40}
			height={40}
			alt={GITHUB.DEFAULLT_NAME}
		></Image>
	);
}
