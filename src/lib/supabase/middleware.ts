import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// Rate limit configuration
const RATE_LIMITS = {
  auth: { count: 5, window: 60 }, // 5 requests per minute
  contact: { count: 3, window: 60 }, // 3 requests per minute (strict)
  api: { count: 60, window: 60 }, // 60 requests per minute
};

async function checkRateLimit(supabase: any, ip: string, type: 'auth' | 'contact' | 'api') {
  const { count, window } = RATE_LIMITS[type];
  const { data, error } = await supabase.rpc('check_rate_limit', {
    rate_key: `${type}:${ip}`,
    limit_count: count,
    window_seconds: window,
  });
  
  // If RPC fails (e.g. function doesn't exist yet), default to allow but log error
  if (error) {
    console.error('Rate limit check failed:', error);
    return true; 
  }
  
  return data;
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // --- Rate Limiting Strategy ---
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const path = request.nextUrl.pathname;

  // 1. Strict Auth Limit
  if (path.startsWith('/auth/')) {
    const isAllowed = await checkRateLimit(supabase, ip, 'auth');
    if (!isAllowed) {
      return new NextResponse('Too Many Requests', { status: 429 });
    }
  }

  // 2. Strict Contact Form Limit
  if (path.startsWith('/api/contact')) {
     const isAllowed = await checkRateLimit(supabase, ip, 'contact');
     if (!isAllowed) {
       return new NextResponse('Too Many Requests', { status: 429 });
     }
  }

   // 3. General API Limit (excluding auth/contact which are already checked)
   if (path.startsWith('/api/') && !path.startsWith('/api/contact') && !path.startsWith('/api/auth')) {
      const isAllowed = await checkRateLimit(supabase, ip, 'api');
      if (!isAllowed) {
        return new NextResponse('Too Many Requests', { status: 429 });
      }
   }

  const { data: { user } } = await supabase.auth.getUser()

  // Protected Routes Logic
  if (request.nextUrl.pathname.startsWith('/admin')) {
      if (!user) {
          return NextResponse.redirect(new URL('/signup', request.url))
      }
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      
      if (profile?.role !== 'admin') {
         return NextResponse.redirect(new URL('/', request.url))
      }
  }

  return response
}
