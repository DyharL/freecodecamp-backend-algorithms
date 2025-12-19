// Cloudflare Pages Function: /api/users
export const onRequest: PagesFunction = async (context) => {
  const req = context.request;

  if (req.method === 'POST') {
    const body: any = await req.json().catch(() => ({}));
    const username = body.username || 'alexdev';
    return new Response(JSON.stringify({ username, _id: '507f1f77bcf86cd799439011' }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }

  // GET /api/users
  return new Response(JSON.stringify([
    { username: 'alexdev', _id: '507f1f77bcf86cd799439011' },
    { username: 'engineer', _id: '507f191e810c19729de860ea' }
  ]), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
};
