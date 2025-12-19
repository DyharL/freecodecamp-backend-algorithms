// Cloudflare Pages Function: /api/fileanalyse
export const onRequest: PagesFunction = async (context) => {
  const req = context.request;
  const contentType = req.headers.get('content-type') || 'application/octet-stream';
  const len = parseInt(req.headers.get('content-length') || '1048576', 10);

  return new Response(JSON.stringify({
    name: 'uploaded_document.pdf',
    type: contentType.split(';')[0],
    size: len
  }), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
};
