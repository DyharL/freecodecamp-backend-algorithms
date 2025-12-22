# freeCodeCamp Certified Engineering Suite

**Curriculum completed: 2023–2024 | Repository initialized: December 2025.**


Production implementation of the official **freeCodeCamp Back End Development & APIs** and **Scientific Computing** curricula.

This repository features **10 fully tested standalone projects** (5 REST microservices in Node.js/TypeScript and 5 mathematical engineering suites in canonical **Python** in `python/`), accompanied by an interactive edge-compatible developer playground.

Live Interactive Showcase: [https://freecodecamp-backend-algorithms.pages.dev](https://freecodecamp-backend-algorithms.pages.dev)

---

## 🏛️ Architecture & Project Catalog

### Section A: Back End Development & APIs (Microservices)

| # | Service Name | Path / Protocol | Core Engineering Highlights |
| :--- | :--- | :--- | :--- |
| **01** | **[Timestamp Microservice](src/microservices/01-timestamp.ts)** | `GET /api/timestamp/:date?` | Bidirectional Unix epoch and ISO 8601 parser with UTC formatting and error boundaries. |
| **02** | **[Request Header Parser](src/microservices/02-header-parser.ts)** | `GET /api/whoami` | Edge IP inspection (with `x-forwarded-for` proxy traversal), locale detection, and User-Agent parsing. |
| **03** | **[URL Shortener Service](src/microservices/03-url-shortener.ts)** | `POST /api/shorturl`<br>`GET /api/shorturl/:id` | Protocol validation (`http://` / `https://`), asynchronous DNS lookup (`dns.lookup`), and HTTP 302 redirects. |
| **04** | **[Exercise Tracker API](src/microservices/04-exercise-tracker.ts)** | `GET/POST /api/users`<br>`GET /api/users/:_id/logs` | Relational workout entity store with date-range query filters (`from`, `to`) and pagination (`limit`). |
| **05** | **[File Metadata Analyzer](src/microservices/05-file-metadata.ts)** | `POST /api/fileanalyse` | Multipart form boundary parsing extracting filename, canonical MIME type, and exact byte payload size. |

---

### Section B: Scientific Computing & Algorithms

| # | Algorithm Module | Primary Focus | Theoretical & Practical Complexity |
| :--- | :--- | :--- | :--- |
| **06** | **[Arithmetic Formatter](src/algorithms/06-arithmetic-formatter.ts)** | Tabular String Layout | $O(N)$ string buffer alignment, strict 4-digit input validation, and optional answer rendering. |
| **07** | **[Time Duration Calculator](src/algorithms/07-time-calculator.ts)** | Clock Arithmetic & Rollover | 12-hour / 24-hour time conversion, AM/PM shift calculations, and multi-day weekly rollover modulo. |
| **08** | **[Budget Ledger & Visualizer](src/algorithms/08-budget-app.ts)** | Object-Oriented Architecture | Encapsulated balance ledgers, transfer validation, and procedural ASCII percentage spend chart generation. |
| **09** | **[Polygon Area Calculator](src/algorithms/09-polygon-area-calculator.ts)** | Geometric Modeling & Tiling | Object-oriented class inheritance (`Square` $\rightarrow$ `Rectangle`), diagonal math, and 2D shape fitting. |
| **10** | **[Probability Calculator](src/algorithms/10-probability-calculator.ts)** | Monte Carlo Simulation | Non-replacement stochastic sampling estimating empirical probability convergence over large trial sets. |

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js `>= 22.0.0`
- npm `>= 10.0.0`

### 2. Installation
```bash
git clone https://github.com/DyharL/freecodecamp-backend-algorithms.git
cd freecodecamp-backend-algorithms
npm install
```

### 3. Running Unit Tests
The test suite utilizes Node.js's native test runner (`node:test` and `node:assert/strict`) via `tsx` with **zero test runner vulnerabilities**:
```bash
npm test
```

### 4. Running the Local Server & Playground
Launch the unified server serving both the REST API endpoints and the interactive developer playground:
```bash
npm run dev
# or for production:
npm run build && npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Test Coverage Summary

```text
▶ Microservice 01: Timestamp
  ✔ returns valid unix and utc for standard date string
  ✔ handles unix timestamp string as integer input
  ✔ handles empty parameter by returning current date
  ✔ returns error object for invalid date parameter
▶ Microservice 02: Request Header Parser
  ✔ extracts IP, language, and software from headers
  ✔ falls back to socket IP when forwarded-for is absent
▶ Microservice 03: URL Shortener
  ✔ shortens valid web URL and creates redirect id
  ✔ rejects invalid URL without HTTP protocol
  ✔ rejects malformed string
▶ Microservice 04: Exercise Tracker
  ✔ creates users and logs exercises with date filtering
▶ Microservice 05: File Metadata
  ✔ extracts filename, mimetype and byte size
  ✔ handles missing file gracefully
▶ Algorithm 06: Arithmetic Formatter
  ✔ formats standard arithmetic problems vertically
  ✔ displays answers when showAnswers is true
  ✔ validates maximum problems count
  ✔ validates operators strictly
  ✔ validates digit characters only
  ✔ validates 4-digit maximum limit
▶ Algorithm 07: Time Calculator
  ✔ adds duration within same day
  ✔ handles next day rollover correctly
  ✔ handles multiple days rollover
  ✔ tracks day of the week case-insensitively
▶ Algorithm 08: Budget App
  ✔ manages deposits, withdrawals, balances and transfers
  ✔ formats ledger string representation cleanly
  ✔ generates spend chart with percentage distribution
▶ Algorithm 09: Polygon Area Calculator
  ✔ calculates rectangle dimensions and tiling fits
  ✔ handles square subclass and synchronized sides
  ✔ generates ASCII picture representation
▶ Algorithm 10: Probability Calculator
  ✔ initializes hat and performs random ball drawing
  ✔ runs Monte Carlo experiment and returns probability within expected statistical range

ℹ tests 30
ℹ suites 10
ℹ pass 30
ℹ fail 0
```

---

## 📄 License

This repository is licensed under the [MIT License](LICENSE).
