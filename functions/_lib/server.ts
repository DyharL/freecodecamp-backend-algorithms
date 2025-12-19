import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { parseTimestamp } from './microservices/01-timestamp.js';
import { parseHeaders } from './microservices/02-header-parser.js';
import { UrlShortenerService } from './microservices/03-url-shortener.js';
import { ExerciseTrackerService } from './microservices/04-exercise-tracker.js';
import { extractFileMetadata } from './microservices/05-file-metadata.js';
import { arithmeticArranger } from './algorithms/06-arithmetic-formatter.js';
import { addTime } from './algorithms/07-time-calculator.js';
import { Category, createSpendChart } from './algorithms/08-budget-app.js';
import { Rectangle, Square } from './algorithms/09-polygon-area-calculator.js';
import { Hat, experiment } from './algorithms/10-probability-calculator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.resolve(__dirname, '../public');

const urlService = new UrlShortenerService();
const exerciseService = new ExerciseTrackerService();

// Pre-seed an initial exercise user for demo playground
const demoUser = exerciseService.createUser('alexdev');
exerciseService.addExercise(demoUser._id, 'High-intensity interval sprint', 30, '2024-06-15');
exerciseService.addExercise(demoUser._id, 'Olympic barbell deadlifts', 45, '2024-06-16');

export function createServer() {
  return http.createServer(async (req, res) => {
    const parsedUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
    const pathname = parsedUrl.pathname;
    const method = req.method?.toUpperCase() || 'GET';

    // CORS Headers for public API interoperability
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    const sendJson = (statusCode: number, data: unknown) => {
      res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(data, null, 2));
    };

    const readBody = async (): Promise<string> => {
      const chunks: Buffer[] = [];
      for await (const chunk of req) {
        chunks.push(chunk as Buffer);
      }
      return Buffer.concat(chunks).toString('utf-8');
    };

    try {
      // 1. Timestamp Endpoint
      if (pathname === '/api/timestamp' || pathname.startsWith('/api/timestamp/')) {
        const param = pathname.replace('/api/timestamp', '').replace(/^\//, '');
        const decoded = param ? decodeURIComponent(param) : '';
        const result = parseTimestamp(decoded);
        sendJson(200, result);
        return;
      }

      // 2. Whoami / Header Parser Endpoint
      if (pathname === '/api/whoami') {
        const result = parseHeaders({
          ip: req.socket.remoteAddress,
          forwardedFor: req.headers['x-forwarded-for'] as string,
          acceptLanguage: req.headers['accept-language'] as string,
          userAgent: req.headers['user-agent'] as string
        });
        sendJson(200, result);
        return;
      }

      // 3. URL Shortener Endpoint
      if (pathname === '/api/shorturl' && method === 'POST') {
        const rawBody = await readBody();
        let targetUrl = '';
        try {
          const parsed = JSON.parse(rawBody);
          targetUrl = parsed.url;
        } catch {
          // Parse urlencoded form
          const params = new URLSearchParams(rawBody);
          targetUrl = params.get('url') || '';
        }

        const result = await urlService.shortenUrl(targetUrl);
        sendJson(200, result);
        return;
      }

      if (pathname.startsWith('/api/shorturl/')) {
        const id = pathname.replace('/api/shorturl/', '');
        const redirect = urlService.getUrl(id);
        if (redirect) {
          res.writeHead(302, { Location: redirect });
          res.end();
          return;
        }
        sendJson(404, { error: 'No short URL found for the given input' });
        return;
      }

      // 4. Exercise Tracker Endpoints
      if (pathname === '/api/users' && method === 'POST') {
        const rawBody = await readBody();
        let username = '';
        try {
          username = JSON.parse(rawBody).username;
        } catch {
          const params = new URLSearchParams(rawBody);
          username = params.get('username') || '';
        }
        const user = exerciseService.createUser(username);
        sendJson(200, user);
        return;
      }

      if (pathname === '/api/users' && method === 'GET') {
        sendJson(200, exerciseService.getAllUsers());
        return;
      }

      const exercisePostMatch = pathname.match(/^\/api\/users\/([^/]+)\/exercises$/);
      if (exercisePostMatch && method === 'POST') {
        const userId = exercisePostMatch[1];
        const rawBody = await readBody();
        let desc = '', duration: any = 0, date: string | undefined = undefined;
        try {
          const b = JSON.parse(rawBody);
          desc = b.description;
          duration = b.duration;
          date = b.date;
        } catch {
          const params = new URLSearchParams(rawBody);
          desc = params.get('description') || '';
          duration = params.get('duration') || 0;
          date = params.get('date') || undefined;
        }
        const ex = exerciseService.addExercise(userId, desc, duration, date);
        sendJson(200, ex);
        return;
      }

      const logsMatch = pathname.match(/^\/api\/users\/([^/]+)\/logs$/);
      if (logsMatch && method === 'GET') {
        const userId = logsMatch[1];
        const from = parsedUrl.searchParams.get('from') || undefined;
        const to = parsedUrl.searchParams.get('to') || undefined;
        const limit = parsedUrl.searchParams.get('limit') || undefined;
        const logs = exerciseService.getLogs(userId, { from, to, limit });
        sendJson(200, logs);
        return;
      }

      // 5. File Metadata Endpoint (Mock / Form inspection)
      if (pathname === '/api/fileanalyse' && method === 'POST') {
        const headerType = req.headers['content-type'] || '';
        const len = parseInt(req.headers['content-length'] || '0', 10);
        const result = extractFileMetadata('uploaded_document.pdf', headerType.split(';')[0] || 'application/pdf', len);
        sendJson(200, result);
        return;
      }

      // Algorithms Interactive Endpoints
      if (pathname === '/api/algorithms/arithmetic' && method === 'POST') {
        const body = JSON.parse(await readBody());
        const output = arithmeticArranger(body.problems, body.showAnswers);
        sendJson(200, { result: output });
        return;
      }

      if (pathname === '/api/algorithms/time' && method === 'POST') {
        const body = JSON.parse(await readBody());
        const output = addTime(body.start, body.duration, body.startingDay);
        sendJson(200, { result: output });
        return;
      }

      if (pathname === '/api/algorithms/budget' && method === 'POST') {
        const food = new Category('Food');
        const clothing = new Category('Clothing');
        const auto = new Category('Auto');
        food.deposit(1000, 'deposit');
        clothing.deposit(1000, 'deposit');
        auto.deposit(1000, 'deposit');
        food.withdraw(120, 'groceries');
        clothing.withdraw(60, 'jacket');
        auto.withdraw(30, 'gas');
        sendJson(200, {
          ledgerSample: food.toString(),
          chart: createSpendChart([food, clothing, auto])
        });
        return;
      }

      if (pathname === '/api/algorithms/polygon' && method === 'POST') {
        const rect = new Rectangle(12, 6);
        const sq = new Square(5);
        sendJson(200, {
          rectangle: {
            area: rect.get_area(),
            perimeter: rect.get_perimeter(),
            diagonal: rect.get_diagonal(),
            squareFit: rect.get_amount_inside(sq)
          }
        });
        return;
      }

      if (pathname === '/api/algorithms/probability' && method === 'POST') {
        const hat = new Hat({ blue: 4, red: 2, green: 6 });
        const prob = experiment(hat, { blue: 2, red: 1 }, 4, 500);
        sendJson(200, { probability: prob, trials: 500 });
        return;
      }

      // Serve Static Files from public directory
      let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);
      try {
        const stat = await fs.stat(filePath);
        if (stat.isDirectory()) {
          filePath = path.join(filePath, 'index.html');
        }
        const content = await fs.readFile(filePath);
        const ext = path.extname(filePath).toLowerCase();
        const contentTypes: Record<string, string> = {
          '.html': 'text/html; charset=utf-8',
          '.css': 'text/css; charset=utf-8',
          '.js': 'application/javascript; charset=utf-8',
          '.json': 'application/json; charset=utf-8',
          '.svg': 'image/svg+xml',
          '.png': 'image/png'
        };
        res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'application/octet-stream' });
        res.end(content);
        return;
      } catch {
        // Fallback to index.html for single-page app
        const indexHtml = await fs.readFile(path.join(PUBLIC_DIR, 'index.html'));
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(indexHtml);
        return;
      }
    } catch (err: any) {
      sendJson(500, { error: err?.message || 'Internal Server Error' });
    }
  });
}

// Auto-run if executed directly
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const server = createServer();
  server.listen(PORT, () => {
    console.log(`[freecodecamp-backend-algorithms] Live server running on http://localhost:${PORT}`);
  });
}
