import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest): NextResponse {
	if (request.nextUrl.pathname === '/admin') {
		return NextResponse.redirect(new URL('/', request.url));
	}
	return NextResponse.next();
}
