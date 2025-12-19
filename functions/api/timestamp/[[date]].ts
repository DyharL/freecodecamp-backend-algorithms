import { parseTimestamp } from '../../_lib/microservices/01-timestamp.ts';

export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const param = url.pathname.replace('/api/timestamp', '').replace(/^\//, '');
  const decoded = param ? decodeURIComponent(param) : '';
  const result = parseTimestamp(decoded);

  return new Response(JSON.stringify(result, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    }
  });
};
