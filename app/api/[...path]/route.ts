import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = 'http://localhost:8000';

export async function GET(
    request: NextRequest,
    { params }: { params: { path: string[] } }
) {
    // Reconstruct the path from params
    const path = params.path.join('/');
    const searchParams = request.nextUrl.searchParams.toString();

    // We want to match exactly what the backend expects.
    // Based on testing:
    // /jobs/ -> needs trailing slash
    // /jobs/stats/count -> does NOT want trailing slash

    let backendPath = path;
    if (path === 'jobs') {
        backendPath = 'jobs/';
    }

    const url = `${BACKEND_URL}/${backendPath}${searchParams ? `?${searchParams}` : ''}`;

    console.log(`[Proxy] Fetching: ${url}`);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            return NextResponse.json({ error: `Backend returned ${response.status}` }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('[Proxy] Fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}
