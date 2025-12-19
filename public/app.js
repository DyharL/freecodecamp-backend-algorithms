// Interactive Demo Handler for freeCodeCamp Backend & Algorithms Suite

async function callApi(endpoint, options = {}) {
  try {
    const res = await fetch(endpoint, options);
    const data = await res.json();
    return JSON.stringify(data, null, 2);
  } catch (err) {
    return JSON.stringify({ error: err.message }, null, 2);
  }
}

// 01. Timestamp
async function testTimestamp() {
  const input = document.getElementById('input-timestamp').value.trim();
  const output = document.getElementById('output-timestamp');
  output.textContent = 'Processing request...';
  const url = input ? `/api/timestamp/${encodeURIComponent(input)}` : '/api/timestamp';
  output.textContent = await callApi(url);
}

// 02. Whoami / Header Parser
async function testWhoami() {
  const output = document.getElementById('output-whoami');
  output.textContent = 'Inspecting incoming HTTP headers...';
  output.textContent = await callApi('/api/whoami');
}

// 03. URL Shortener
async function testShortener() {
  const input = document.getElementById('input-shortener').value.trim();
  const output = document.getElementById('output-shortener');
  output.textContent = 'Resolving DNS and shortening...';
  output.textContent = await callApi('/api/shorturl', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: input })
  });
}

// 04. Exercise Tracker
async function testExercise() {
  const output = document.getElementById('output-exercise');
  output.textContent = 'Querying exercise database...';
  output.textContent = await callApi('/api/users');
}

// 05. File Metadata
async function testFileMetadata() {
  const output = document.getElementById('output-file');
  output.textContent = 'Analyzing multipart stream...';
  output.textContent = await callApi('/api/fileanalyse', {
    method: 'POST',
    headers: { 'Content-Type': 'application/pdf', 'Content-Length': '1048576' }
  });
}

// 06. Arithmetic Formatter
async function testArithmetic() {
  const output = document.getElementById('output-arithmetic');
  output.textContent = 'Arranging vertical equations...';
  const res = await fetch('/api/algorithms/arithmetic', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      problems: ['32 + 698', '3801 - 2', '45 + 43', '123 + 49'],
      showAnswers: true
    })
  });
  const data = await res.json();
  output.textContent = data.result;
}

// 07. Time Calculator
async function testTime() {
  const output = document.getElementById('output-time');
  output.textContent = 'Computing clock duration...';
  const res = await fetch('/api/algorithms/time', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      start: '11:43 PM',
      duration: '24:20',
      startingDay: 'Tuesday'
    })
  });
  const data = await res.json();
  output.textContent = data.result;
}

// 08. Budget App
async function testBudget() {
  const output = document.getElementById('output-budget');
  output.textContent = 'Generating spending chart...';
  const res = await fetch('/api/algorithms/budget', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  });
  const data = await res.json();
  output.textContent = data.chart;
}

// 09. Polygon Area
async function testPolygon() {
  const output = document.getElementById('output-polygon');
  output.textContent = 'Calculating polygon dimensions...';
  const res = await fetch('/api/algorithms/polygon', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  });
  const data = await res.json();
  output.textContent = JSON.stringify(data, null, 2);
}

// 10. Probability Calculator
async function testProbability() {
  const output = document.getElementById('output-probability');
  output.textContent = 'Simulating 500 Monte Carlo trials...';
  const res = await fetch('/api/algorithms/probability', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  });
  const data = await res.json();
  output.textContent = JSON.stringify(data, null, 2);
}

// Tab Switching
function switchTab(type) {
  const microGrid = document.getElementById('grid-microservices');
  const algoGrid = document.getElementById('grid-algorithms');
  const btnMicro = document.getElementById('tab-micro');
  const btnAlgo = document.getElementById('tab-algo');

  if (type === 'micro') {
    microGrid.style.display = 'grid';
    algoGrid.style.display = 'none';
    btnMicro.classList.add('active');
    btnAlgo.classList.remove('active');
  } else {
    microGrid.style.display = 'none';
    algoGrid.style.display = 'grid';
    btnMicro.classList.remove('active');
    btnAlgo.classList.add('active');
  }
}
