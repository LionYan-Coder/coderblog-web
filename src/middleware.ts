import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
	publicRoutes: ['/', '/blog(.*)', '/notebook(.*)', '/mailbox(.*)'],
	ignoredRoutes: ['/favicon.ico', /\.(png|jpg|jpeg)$/]
});

export const config = {
	matcher: ['/((?!.+.[w]+$|_next).*)', '/', '/(api|trpc)(.*)']
};
