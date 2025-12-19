import { parseHeaders } from '../_lib/microservices/02-header-parser.ts';

export const onRequest: PagesFunction = async (context) => {
  const req = context.request;
  const result = parseHeaders({
    ip: req.headers.get('cf-connecting-ip'),
    forwardedFor: req.headers.get('x-forwarded-for'),
    acceptLanguage: req.headers.get('accept-language'),
    userAgent: req.headers.get('user-agent')
  });

  return new Response(JSON.stringify(result, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    }
  });
};
