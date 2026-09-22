/* ------------------------------
   AGENT RESPONSE LOGIC
   Rules-based chat assistant for quick frontend guidance, code snippets, and debugging tips.
   ------------------------------ */
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

  if (lower.includes('performance') || lower.includes('speed') || lower.includes('optimize')) {
    return 'Performance tip: compress images, avoid unnecessary JS, and use smaller selectors. Faster pages usually feel more premium and load more smoothly.';
  }

  if (lower.includes('seo') || lower.includes('search')) {
    return 'SEO tip: use semantic HTML, descriptive headings, good alt text, and meaningful content structure so search engines understand the page.';
  }

  if (lower.includes('devtools') || lower.includes('browser')) {
    return 'Browser tip: use DevTools to inspect styles, console errors, and network requests. It is the fastest way to debug real UI issues.';
  }

  if (lower.includes('project') || lower.includes('structure') || lower.includes('folder')) {
    return 'Project tip: keep HTML, CSS, and JS separated, name files clearly, and keep reusable components grouped together so the project stays easy to extend.';
  }

  return null;
}

function getAdvancedGuide(topic) {
  const lower = topic.toLowerCase();
  const suggestions = [];

  if (lower.includes('html') || lower.includes('css') || lower.includes('javascript') || lower.includes('js')) {
    suggestions.push('Start with semantic HTML, then layer in CSS, and finally add small JavaScript interactions.');
  }

  if (lower.includes('css') || lower.includes('layout') || lower.includes('responsive')) {
    suggestions.push('Use Grid/Flexbox for structure and clamp() or media queries for responsive sizing.');
  }

  if (lower.includes('accessibility') || lower.includes('a11y') || lower.includes('aria')) {
    suggestions.push('Add labels, visible focus states, and sufficient color contrast for better accessibility.');
  }

  if (lower.includes('performance') || lower.includes('speed') || lower.includes('optimize')) {
    suggestions.push('Compress media, lazy-load images, and remove unused code to keep the page snappy.');
  }

  if (lower.includes('debug') || lower.includes('error') || lower.includes('bug')) {
    suggestions.push('Check the browser console first, then isolate one change at a time to find the root cause.');
  }

  if (lower.includes('project') || lower.includes('app') || lower.includes('site')) {
    suggestions.push('Keep your structure modular and your styling consistent so the project remains easy to scale.');
  }

  if (suggestions.length === 0) {
    suggestions.push('Start with the simplest working version, test it, and improve one thing at a time.');
  }

  return `Practical approach:\n• ${suggestions.join('\n• ')}`;
}

function getResourceSuggestions(topic) {
  const lower = topic.toLowerCase();

  if (lower.includes('html')) {
    return 'Useful links:\nhttps://www.w3schools.com/html/html_exercises.asp\nhttps://www.w3schools.com/html/default.asp';
  }

  if (lower.includes('css')) {
    return 'Useful links:\nhttps://www.w3schools.com/css/css_exercises.asp\nhttps://css-tricks.com/';
  }

  if (lower.includes('js') || lower.includes('javascript')) {
    return 'Useful links:\nhttps://www.w3schools.com/js/js_exercises.asp\nhttps://www.w3schools.com/js/default.asp';
  }

  return 'Useful links:\nhttps://www.w3schools.com/exercises/index.php\nhttps://www.freecodecamp.org/\nhttps://css-tricks.com/';
}

function buildPatternResponse(title, explanation, codeExample) {
  return `${title}\n${explanation}\n\n\`\`\`html\n${codeExample}\n\`\``;
}

function getAgentReply(message) {
  const cleaned = message.trim();
  const lowered = cleaned.toLowerCase();

  if (!cleaned) {
    return 'Please type a message so I can respond.';
  }

  if (lowered.includes('navbar') || lowered.includes('nav')) {
    return buildPatternResponse(
      'Navbar pattern',
      'Use semantic markup and a simple flex layout. Keep the structure readable and the spacing consistent.',
      '<nav class="nav">\n  <div class="brand">FreddyCr00kz</div>\n  <ul>\n    <li><a href="#">Home</a></li>\n    <li><a href="#">Projects</a></li>\n    <li><a href="#">About</a></li>\n  </ul>\n</nav>\n\n<style>\n.nav { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem; }\n.nav ul { display: flex; gap: 1rem; list-style: none; }\n</style>'
    );
  }

  if (lowered.includes('card') || lowered.includes('panel')) {
    return buildPatternResponse(
      'Premium card pattern',
      'Cards look best with a dark base, subtle border, and a gentle shadow. The goal is clarity without visual noise.',
      '<article class="card">\n  <h3>Featured project</h3>\n  <p>Clean structure, strong hierarchy, and a premium visual rhythm.</p>\n  <button>View project</button>\n</article>\n\n<style>\n.card { background: #111827; border: 1px solid rgba(255,255,255,0.08); border-radius: 18px; padding: 1.2rem; box-shadow: 0 18px 30px rgba(0,0,0,.18); }\n</style>'
    );
  }

  if (lowered.includes('responsive') || lowered.includes('mobile')) {
    return buildPatternResponse(
      'Responsive layout rule',
      'Start with a one-column layout on small screens and expand to multiple columns as space becomes available.',
      '@media (max-width: 700px) {\n  .grid { grid-template-columns: 1fr; }\n}\n\n.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; }'
    );
  }

  if (lowered.includes('dark mode') || lowered.includes('theme')) {
    return buildPatternResponse(
      'Dark mode styling',
      'Use CSS variables for the palette so the whole design stays consistent and easy to tweak later.',
      ':root {\n  --bg: #0f172a;\n  --panel: #111827;\n  --text: #e2e8f0;\n  --accent: #8b5cf6;\n}\n\nbody { background: var(--bg); color: var(--text); }\n.card { background: var(--panel); border: 1px solid rgba(255,255,255,0.08); }'
    );
  }

  if (lowered.includes('exercise') || lowered.includes('practice') || lowered.includes('challenge') || lowered.includes('learn') || lowered.includes('beginner')) {
    return `A good next step is to practice on real examples. ${getResourceSuggestions(lowered)}.`;
  }

  if (lowered.includes('best practice') || lowered.includes('best practices') || lowered.includes('advanced') || lowered.includes('professional') || lowered.includes('workflow')) {
    return getAdvancedGuide(lowered);
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

  if (lowered.includes('generate') || lowered.includes('template') || lowered.includes('snippet')) {
    return 'I can help with snippets. For example, a simple card section is: <section class="card"><h2>Title</h2><p>Text</p><button>Press</button></section>.';
  }

  if (lowered.includes('form')) {
    return 'HTML tip: use <form>, <label>, and proper input types so fields are clear and accessible. Example: <label for="email">Email</label><input id="email" type="email">';
  }

  return `Hi there! Here are a few examples of what I can do for you:\n• HTML structure and semantic markup\n• CSS layouts, buttons, cards, and dark-mode styling\n• JavaScript logic, DOM events, and debugging\n• Responsive design and accessibility improvements\n• Quick code snippets and learning resources\n\nTry asking me something like: “How do I build a responsive navbar?” or “Can you show me a dark-mode card example?”\n\nUseful links:\nhttps://www.w3schools.com/exercises/index.php\nhttps://www.freecodecamp.org/\nhttps://css-tricks.com/`;
}

function formatCodeExample(text) {
  const fenced = text.match(/```(?:[\w-]+)?\n([\s\S]*?)```/);
  if (fenced && fenced[1]) {
    const code = fenced[1].trim();
    const container = document.createElement('div');
    const label = document.createElement('div');
    label.className = 'code-block-label';
    label.textContent = 'Code example';

    const codeWrap = document.createElement('div');
    codeWrap.className = 'code-block';

    const pre = document.createElement('pre');
    const codeEl = document.createElement('code');
    codeEl.textContent = code;
    pre.appendChild(codeEl);

    const copyButton = document.createElement('button');
    copyButton.type = 'button';
    copyButton.textContent = 'Copy';
    copyButton.className = 'copy-code-btn';
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code);
        copyButton.textContent = 'Copied';
        window.setTimeout(() => {
          copyButton.textContent = 'Copy';
        }, 1200);
      } catch (error) {
        copyButton.textContent = 'Copy failed';
      }
    });

    codeWrap.appendChild(pre);
    codeWrap.appendChild(copyButton);
    container.appendChild(label);
    container.appendChild(codeWrap);
    return container;
  }

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
    introEl.className = 'code-intro';
    container.appendChild(introEl);
  }

  const codeWrap = document.createElement('div');
  codeWrap.className = 'code-block';

  const pre = document.createElement('pre');
  const codeEl = document.createElement('code');
  codeEl.textContent = code;
  pre.appendChild(codeEl);

  const copyButton = document.createElement('button');
  copyButton.type = 'button';
  copyButton.textContent = 'Copy';
  copyButton.className = 'copy-code-btn';
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(code);
      copyButton.textContent = 'Copied';
      window.setTimeout(() => {
        copyButton.textContent = 'Copy';
      }, 1200);
    } catch (error) {
      copyButton.textContent = 'Copy failed';
    }
  });

  codeWrap.appendChild(pre);
  codeWrap.appendChild(copyButton);
  container.appendChild(codeWrap);

  return container;
}

function formatLinkText(text) {
  const wrapper = document.createElement('div');
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  if (!urlRegex.test(text)) {
    return null;
  }

  const parts = text.split(urlRegex);

  parts.forEach((part) => {
    if (!part) {
      return;
    }

    if (/^https?:\/\//.test(part)) {
      const link = document.createElement('a');
      link.href = part;
      link.target = '_blank';
      link.rel = 'noreferrer';
      link.textContent = part;
      wrapper.appendChild(link);
      return;
    }

    const textNode = document.createTextNode(part);
    wrapper.appendChild(textNode);
  });

  return wrapper;
}

function createMessageBubble(role, text) {
  const bubble = document.createElement('div');
  bubble.className = `message ${role}`;

  const meta = document.createElement('div');
  meta.className = 'message-meta';
  meta.textContent = role === 'user' ? 'You' : 'Agent';
  bubble.appendChild(meta);

  const formattedCode = formatCodeExample(text);
  if (formattedCode) {
    bubble.appendChild(formattedCode);
    return bubble;
  }

  const formattedLinks = formatLinkText(text);
  if (formattedLinks) {
    bubble.appendChild(formattedLinks);
    return bubble;
  }

  const content = document.createElement('div');
  content.className = 'message-content';
  content.textContent = text;
  bubble.appendChild(content);
  return bubble;
}

function addMessage(role, text) {
  const wrapper = document.getElementById('chat-output');
  const row = document.createElement('div');
  row.className = `message-row ${role}`;

  const bubble = createMessageBubble(role, text);
  row.appendChild(bubble);
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

  const row = document.createElement('div');
  row.id = 'agent-typing';
  row.className = 'message-row agent';

  const typing = document.createElement('div');
  typing.className = 'message agent typing';
  typing.innerHTML = '<span>Agent is thinking</span><span class="typing-dots">...</span>';

  row.appendChild(typing);
  wrapper.appendChild(row);
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
  const clearButton = document.getElementById('clear-chat');

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

  if (clearButton) {
    clearButton.addEventListener('click', () => {
      const chat = document.getElementById('chat-output');
      if (!chat) {
        return;
      }

      chat.innerHTML = '';
      addMessage('agent', 'Chat cleared. Ask me for a new frontend idea, a code example, or a debugging fix.');
    });
  }
});
