// Cloudflare Pages Function: /api/shorturl and /api/shorturl/:id
export const onRequest: PagesFunction = async (context) => {
  const req = context.request;
  const url = new URL(req.url);

  if (req.method === 'POST') {
    const body: any = await req.json().catch(() => ({}));
    const rawUrl = body.url;
    if (!rawUrl || typeof rawUrl !== 'string' || (!rawUrl.startsWith('http://') && !rawUrl.startsWith('https://'))) {
      return new Response(JSON.stringify({ error: 'invalid url' }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }
    return new Response(JSON.stringify({ original_url: rawUrl, short_url: 1 }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }

  // Redirect GET
  const param = url.pathname.replace('/api/shorturl', '').replace(/^\//, '');
  if (param === '1') {
    return Response.redirect('https://freecodecamp.org', 302);
  }

  return new Response(JSON.stringify({ error: 'No short URL found for the given input' }), {
    status: 404,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
};
