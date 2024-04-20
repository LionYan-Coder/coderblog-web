import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
	publicRoutes: ['/', '/blog(.*)', '/note(.*)', '/guestbook(.*)'],
	ignoredRoutes: ['/favicon.ico']
});

export const config = {
	matcher: ['/((?!.+.[w]+$|_next).*)', '/', '/(api|trpc)(.*)']
};
