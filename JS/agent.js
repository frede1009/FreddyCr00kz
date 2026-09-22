const responses = [
  { match: /\bhello\b|\bhi\b|\bhey\b/, reply: 'Hello! I’m your local agent. Ask me for the time, a joke, a quick summary, or frontend coding advice in HTML, CSS, or JavaScript.' },
  { match: /\bwho are you\b|\bname\b/, reply: 'I’m a lightweight browser agent built to act like a friendly frontend helper in this project.' },
  { match: /\btime\b|\bdate\b|\bclock\b/, reply: () => `The current local time is ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} and the date is ${new Date().toLocaleDateString()}.` },
  { match: /\bjoke\b|\bfunny\b/, reply: () => {
      const jokes = [
        'Why do programmers prefer dark mode? Because light attracts bugs.',
        'I told my computer I needed a break, and now it sends me to sleep mode.',
        'A SQL query walks into a bar. The bartender says, “We need to see your table.”'
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    }
  },
  { match: /\bhelp\b|\bwhat can you do\b|\bcommands\b/, reply: 'I can greet you, tell the time, share a joke, and give practical frontend advice in HTML, CSS, and JavaScript. Try asking for a navbar, a card, a mobile layout, or debugging help.' }
];

function getCodingAdvice(topic) {
  const lower = topic.toLowerCase();

  if (lower.includes('html') && (lower.includes('structure') || lower.includes('semantic') || lower.includes('layout') || lower.includes('form'))) {
    return 'HTML tip: use semantic structure and keep sections meaningful. A good page pattern is <header>, <nav>, <main>, <section>, and <footer>. That makes the markup easier to read and much easier to style.';
  }

  if (lower.includes('html')) {
    return 'HTML tip: keep your structure semantic and readable. Use tags like <header>, <main>, <section>, <button>, and <form> instead of stacking too many generic divs. Example: <button class="primary-btn">Click me</button>.';
  }

  if (lower.includes('flex') || lower.includes('grid') || lower.includes('layout') || lower.includes('responsive')) {
    return 'CSS tip: for layout, prefer Flexbox or Grid. Example: .layout { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; }';
  }

  if (lower.includes('css') && (lower.includes('color') || lower.includes('palette') || lower.includes('theme'))) {
    return 'CSS tip: keep colors in variables for consistency. Example: :root { --primary: #6d28d9; --bg: #0f172a; } body { background: var(--bg); color: white; }';
  }

  if (lower.includes('css')) {
    return 'CSS tip: separate structure from styling. Use classes for reusable rules, keep selectors specific, and prefer CSS variables for your palette. Example: .button { background: var(--primary); border-radius: 12px; }';
  }

  if (lower.includes('js') || lower.includes('javascript')) {
    return 'JavaScript tip: keep functions small and readable. Use const/let, avoid global state when possible, and keep DOM logic separate from business logic. Example: const greet = (name) => `Hello, ${name}!`;';
  }

  if (lower.includes('debug') || lower.includes('error') || lower.includes('bug')) {
    return 'Debug tip: isolate the issue, read the console, and test one change at a time. Add console.log at the point where data changes, then narrow the problem with small checks.';
  }

  if (lower.includes('event') || lower.includes('click') || lower.includes('dom')) {
    return 'JavaScript tip: use event listeners to respond to user actions. Example: document.querySelector("button").addEventListener("click", () => console.log("Clicked"));';
  }

  if (lower.includes('array') || lower.includes('map') || lower.includes('filter') || lower.includes('loop')) {
    return 'JavaScript tip: arrays are easier to manage with map/filter. Example: const names = ["Anna", "Tom"]; const upper = names.map(name => name.toUpperCase());';
  }

  if (lower.includes('animation') || lower.includes('transition')) {
    return 'CSS tip: use transitions for polish and keep them subtle. Example: .card { transition: transform 0.2s ease; } .card:hover { transform: translateY(-2px); }';
  }

  if (lower.includes('accessibility') || lower.includes('a11y') || lower.includes('aria')) {
    return 'Accessibility tip: give buttons labels, keep color contrast readable, and use semantic HTML so screen readers can understand the page.';
  }

  return null;
}

function getAgentReply(message) {
  const cleaned = message.trim();
  const lowered = cleaned.toLowerCase();

  if (!cleaned) {
    return 'Please type a message so I can respond.';
  }

  const codingAdvice = getCodingAdvice(lowered);
  if (codingAdvice) {
    return codingAdvice;
  }

  for (const item of responses) {
    if (item.match.test(lowered)) {
      return typeof item.reply === 'function' ? item.reply() : item.reply;
    }
  }

  if (lowered.includes('center') && lowered.includes('css')) {
    return 'CSS tip: to center a block horizontally, use margin: 0 auto; and for centering both ways, use display: flex; justify-content: center; align-items: center;.';
  }

  if (lowered.includes('button') && lowered.includes('html')) {
    return 'HTML tip: use a button element for actions: <button type="button">Save</button>. Add styling in CSS with .button { background: #6d28d9; color: white; }.';
  }

  if (lowered.includes('api') || lowered.includes('fetch')) {
    return 'JavaScript tip: fetch data with async/await and handle errors. Example: const res = await fetch("/api/data"); if (!res.ok) throw new Error("Request failed"); const data = await res.json();';
  }

  if (lowered.includes('responsive') || lowered.includes('mobile')) {
    return 'CSS tip: use media queries and fluid sizing. Example: @media (max-width: 640px) { .layout { grid-template-columns: 1fr; } }';
  }

  if (lowered.includes('dark mode') || lowered.includes('theme')) {
    return 'CSS tip: use CSS variables for theme states. Example: body.dark { --bg: #0f172a; --panel: #111827; }';
  }

  if (lowered.includes('navbar') || lowered.includes('nav')) {
    return 'HTML/CSS tip: build a simple nav with a list of links and use Flexbox for spacing. Example: nav ul { display: flex; gap: 1rem; list-style: none; }';
  }

  if (lowered.includes('card') || lowered.includes('panel')) {
    return 'CSS tip: cards usually work best with a soft background, border radius, and subtle shadow. Example: .card { background: white; border-radius: 16px; box-shadow: 0 8px 20px rgba(0,0,0,0.08); }';
  }

  if (lowered.includes('generate') || lowered.includes('template') || lowered.includes('snippet')) {
    return 'I can help with snippets. For example, a simple card section is: <section class="card"><h2>Title</h2><p>Text</p><button>Press</button></section>.';
  }

  if (lowered.includes('form')) {
    return 'HTML tip: use <form>, <label>, and proper input types so fields are clear and accessible. Example: <label for="email">Email</label><input id="email" type="email">';
  }

  return 'I can help with that. Try asking for HTML, CSS, JavaScript, debugging, nav design, card styling, responsiveness, or a quick code snippet.';
}

function formatCodeExample(text) {
  const match = text.match(/^(.*?)(?:\s*Example:\s*)([\s\S]+)$/);

  if (!match) {
    return null;
  }

  const intro = match[1].trim();
  const code = match[2].trim();

  if (!code) {
    return null;
  }

  const container = document.createElement('div');

  if (intro) {
    const introEl = document.createElement('div');
    introEl.textContent = intro;
    container.appendChild(introEl);
  }

  const pre = document.createElement('pre');
  const codeEl = document.createElement('code');
  codeEl.textContent = code;
  pre.appendChild(codeEl);
  container.appendChild(pre);

  return container;
}

function addMessage(role, text) {
  const wrapper = document.getElementById('chat-output');
  const row = document.createElement('div');
  row.className = `message ${role}`;

  const formatted = formatCodeExample(text);

  if (formatted) {
    row.appendChild(formatted);
  } else {
    row.textContent = text;
  }

  wrapper.appendChild(row);
  wrapper.scrollTop = wrapper.scrollHeight;
}

function showTypingState(isTyping) {
  const wrapper = document.getElementById('chat-output');
  const existing = document.getElementById('agent-typing');

  if (existing) {
    existing.remove();
  }

  if (!isTyping) {
    return;
  }

  const typing = document.createElement('div');
  typing.id = 'agent-typing';
  typing.className = 'message agent';
  typing.innerHTML = 'Agent is thinking<span class="typing-dots">...</span>';
  wrapper.appendChild(typing);
  wrapper.scrollTop = wrapper.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById('user-input');
  const value = input.value.trim();

  if (!value) {
    return;
  }

  addMessage('user', value);
  input.value = '';
  showTypingState(true);

  window.setTimeout(() => {
    showTypingState(false);
    const reply = getAgentReply(value);
    addMessage('agent', reply);
  }, 350);
}

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('user-input');
  const button = document.getElementById('send-button');
  const chips = document.querySelectorAll('.prompt-chip');
  const promptSelect = document.getElementById('prompt-select');

  addMessage('agent', 'Welcome! I’m ready to help with frontend concepts, code snippets, and quick debugging advice.');

  button.addEventListener('click', sendMessage);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      input.value = chip.dataset.prompt || '';
      sendMessage();
    });
  });

  if (promptSelect) {
    promptSelect.addEventListener('change', (event) => {
      const value = event.target.value;
      if (!value) {
        return;
      }

      input.value = value;
      sendMessage();
      event.target.value = '';
    });
  }
});
