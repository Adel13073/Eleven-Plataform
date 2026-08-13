// ─── NAVBAR SCROLL ───
(function() {
    const navbar = document.getElementById('navbar');
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();

// ─── MOBILE NAV ───
(function() {
    const burger = document.getElementById('burger');
    const drawer = document.getElementById('drawer');
    if (!burger || !drawer) return;
    burger.addEventListener('click', () => {
        const open = drawer.classList.toggle('open');
        burger.setAttribute('aria-expanded', open);
    });
    drawer.querySelectorAll('.drawer-link').forEach(link => {
        link.addEventListener('click', () => {
            drawer.classList.remove('open');
            burger.setAttribute('aria-expanded', false);
        });
    });
})();

// ─── REVEAL ON SCROLL ───
(function() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
        });
    }, { threshold: .1, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => observer.observe(el));
})();

// ─── IO TABS ───
(function() {
    const tabs = document.querySelectorAll('.io-tab');
    if (!tabs.length) return;
    const content = {
        'Texto': 'Analise as vendas da região Sul e gere um relatório executivo com projeção para Q3.',
        'Voz': '🎙️ [Clique para gravar — suporte a português, inglês e espanhol]',
        'Ficheiro': '📂 [Arraste um CSV, Excel ou PDF aqui para análise automática]'
    };
    const textarea = document.querySelector('.io-textarea');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            if (textarea) textarea.value = content[tab.textContent.trim()] || '';
        });
    });
})();

// ─── FORM SUBMIT ───
(function() {
    const submitBtn = document.getElementById('form-submit');
    const successMsg = document.getElementById('form-success');
    if (!submitBtn || !successMsg) return;
    submitBtn.addEventListener('click', () => {
        const inputs = document.querySelectorAll('#contact-form .form-input');
        let hasContent = false;
        inputs.forEach(inp => { if (inp.value.trim()) hasContent = true; });
        if (!hasContent) {
            submitBtn.style.animation = 'shake .4s ease';
            submitBtn.addEventListener('animationend', () => { submitBtn.style.animation = ''; }, { once: true });
            return;
        }
        submitBtn.textContent = 'A enviar…';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '.7';
        setTimeout(() => {
            submitBtn.style.display = 'none';
            successMsg.classList.add('show');
            inputs.forEach(inp => inp.value = '');
        }, 1100);
    });
})();

// ─── HERO REVEAL TIMING ───
(function() {
    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), 180 + i * 110);
    });
})();

// ─── SMOOTH SCROLL ───
(function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
        });
    });
})();

// ─── CARD 3D EFFECT ───
(function() {
    const cards = document.querySelectorAll('.service-card');
    if (!cards.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - .5;
            const y = (e.clientY - rect.top) / rect.height - .5;
            card.style.transform = `translateY(-5px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
})();

// ─── KPI COUNTER ANIMATION ───
(function() {
    const kpiNums = document.querySelectorAll('.kpi-num');
    if (!kpiNums.length) return;
    const parseNum = str => parseFloat(str.trim().replace(/[^0-9.]/g, ''));
    const formatNum = (val, original) => {
        if (original.includes('%')) return val.toFixed(1) + '%';
        if (original.includes(',')) return Math.round(val).toLocaleString('pt-BR');
        return Math.round(val).toString();
    };
    const animateCounter = el => {
        const original = el.textContent;
        const target = parseNum(original);
        if (isNaN(target)) return;
        const duration = 1100,
            start = performance.now();
        const step = now => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = formatNum(eased * target, original);
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target);
                observer.unobserve(e.target); } });
    }, { threshold: .5 });
    kpiNums.forEach(el => observer.observe(el));
})();

// ─── ELEVEN ASSISTANT (Groq Chat) ───
const GROQ_KEY = ''; // Deixe vazia para usar modo demo
const GROQ_MODEL = 'llama-3.3-70b-versatile';

const CHAT_SYSTEM = `És o ELEVEN Assistant, assistente de atendimento da ELEVEN Technology — empresa angolana de IA com sede em Luanda, Angola.

SOBRE A ELEVEN:
- 5 módulos de IA: Atendimento Inteligente, Reconhecimento de Voz (98% precisão), Análise de Dados, Otimização de Rotas (-38% custos), Geração de Imagens (Flux AI, gratuito)
- Planos em Kwanzas: Básico 49.990 Kz/mês | Pro 149.990 Kz/mês | Premium 499.990 Kz/mês
- Contactos: Email: 1.eleven.onze.1@gmail.com | WhatsApp: +244 958 432 897
- Plataforma disponível 24/7, suporte em Português de Angola

COMPORTAMENTO:
- Responde SEMPRE em Português (Angola) salvo se o utilizador escrever noutra língua
- Profissional, caloroso e directo — máximo 3 parágrafos curtos
- Usa **negrito** para termos importantes
- Para urgências indica: WhatsApp +244 958 432 897 ou 1.eleven.onze.1@gmail.com`;

const CHAT_FALLBACK = [
    { k: ['prec', 'plan', 'kz', 'kwanza', 'custo', 'quanto', 'pagar'], r: 'A ELEVEN oferece 3 planos:\n\n**Básico — 49.990 Kz/mês**: 10.000 consultas, atendimento e dashboard.\n**Pro — 149.990 Kz/mês**: todos os módulos, API completa e suporte 24h.\n**Premium — 499.990 Kz/mês**: ilimitado, modelo personalizado e gestor dedicado.\n\nContacto: **1.eleven.onze.1@gmail.com** | WhatsApp **+244 958 432 897**.' },
    { k: ['servic', 'modulo', 'ofere', 'o que'], r: 'A ELEVEN disponibiliza **cinco módulos de IA**:\n\n**Atendimento Inteligente** · **Reconhecimento de Voz** (98% precisão) · **Análise de Dados** · **Otimização de Rotas** (-38% custos) · **Geração de Imagens** (gratuito, sem limites).\n\nQual módulo interessa mais?' },
    { k: ['contacto', 'falar', 'equipa', 'humano', 'comercial'], r: 'Contacta a nossa equipa:\n\nEmail: **1.eleven.onze.1@gmail.com**\nWhatsApp: **+244 958 432 897**\n\nRespondemos em horário laboral angolano.' },
    { k: ['suporte', 'problema', 'urgente', 'erro'], r: 'Para suporte urgente:\n\nWhatsApp: **+244 958 432 897** (resposta rápida)\nEmail: **1.eleven.onze.1@gmail.com**\n\nClientes Pro e Premium têm suporte prioritário 24h.' },
    { k: ['voz', 'transcri', 'audio', 'whisper'], r: 'O módulo de **Reconhecimento de Voz** atinge **98.2% de precisão** em português — incluindo sotaques angolanos. Latência de 120ms. Suporte a ambientes com ruído até 70dB.' },
    { k: ['dado', 'analise', 'dashboard', 'relatorio', 'insight'], r: 'A **Análise de Dados** gera dashboards preditivos automaticamente. Deteta anomalias em tempo real e projeta tendências com intervalo de confiança. Integração com Excel, SAP e Salesforce.' },
    { k: ['rota', 'logistic', 'entrega', 'transport'], r: 'A **Otimização de Rotas** foi calibrada para a infraestrutura angolana. Redução média de **38%** em custos de combustível com recálculo em tempo real.' },
    { k: ['imagem', 'foto', 'visual', 'flux', 'gerad'], r: 'O **Gerador de Imagens** usa Flux AI — **completamente gratuito** e sem limites. Cria logos, ilustrações e mockups de produto a partir de texto em segundos.' },
    { k: ['demo', 'demonstrac', 'testar', 'ver'], r: 'Podemos marcar uma demonstração personalizada!\n\nContacta-nos pelo WhatsApp **+244 958 432 897** ou Email **1.eleven.onze.1@gmail.com** e a equipa agenda brevemente.' },
    { k: ['oi', 'ola', 'bom dia', 'boa tarde', 'hello', 'hi'], r: 'Olá! Bem-vindo à **ELEVEN Technology Angola**! Estou aqui para responder às suas questões sobre os nossos serviços, planos em Kz ou agendar uma demonstração. O que precisa?' },
];

function chatFallback(t) {
    const l = t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    for (const i of CHAT_FALLBACK) { if (i.k.some(k => l.includes(k))) return i.r; }
    return 'Posso ajudar com questões sobre os nossos **planos em Kz**, **módulos de IA** ou **contactar a equipa**.\n\nWhatsApp **+244 958 432 897** | Email **1.eleven.onze.1@gmail.com**.';
}

let chatHistory = [],
    chatBusy = false;

function chatFmt(t) {
    return t.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .split('\n').map(l => l.trim() ? `<p>${l}</p>` : '').join('');
}

function chatAddMsg(role, text) {
    const box = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = role === 'user' ? 'msg-user' : 'msg-ai';
    if (role === 'user') { div.textContent = text; } else { div.innerHTML = chatFmt(text); }
    div.style.cssText = `opacity:0;transform:translateX(${role === 'user' ? '8px' : '-8px'});transition:opacity .18s,transform .18s`;
    box.appendChild(div);
    requestAnimationFrame(() => { div.style.opacity = '1';
        div.style.transform = 'translateX(0)'; });
    box.scrollTop = box.scrollHeight;
    chatHistory.push({ role: role === 'user' ? 'user' : 'assistant', content: text });
    if (role === 'user') {
        const chips = document.getElementById('chat-chips');
        if (chips) chips.style.display = 'none';
    }
}

function chatShowTyping() {
    const box = document.getElementById('chat-messages');
    const d = document.createElement('div');
    d.id = 'chat-typing';
    d.className = 'msg-typing';
    d.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
    d.style.cssText = 'opacity:0;transition:opacity .15s';
    box.appendChild(d);
    requestAnimationFrame(() => d.style.opacity = '1');
    box.scrollTop = box.scrollHeight;
}

function chatHideTyping() {
    const t = document.getElementById('chat-typing');
    if (t) t.remove();
}

async function sendChatMessage() {
    const input = document.getElementById('chat-user-input');
    const sendBtn = document.getElementById('chat-send');
    const text = input.value.trim();
    if (!text || chatBusy) return;
    input.value = '';
    sendBtn.disabled = true;
    chatBusy = true;
    chatAddMsg('user', text);
    chatShowTyping();
    try {
        if (GROQ_KEY === '') {
            // Modo demo
            setTimeout(() => {
                chatHideTyping();
                chatAddMsg('assistant', chatFallback(text));
                chatBusy = false;
                sendBtn.disabled = false;
                setTimeout(() => input.focus(), 50);
            }, 800);
            return;
        }
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + GROQ_KEY
            },
            body: JSON.stringify({
                model: GROQ_MODEL,
                messages: [{ role: 'system', content: CHAT_SYSTEM }, ...chatHistory.slice(0, -1)],
                max_tokens: 500,
                temperature: 0.7
            }),
            signal: AbortSignal.timeout(28000)
        });
        if (!res.ok) throw new Error('API error: ' + res.status);
        const data = await res.json();
        const reply = data?.choices?.[0]?.message?.content || 'Não foi possível obter resposta.';
        chatHideTyping();
        chatAddMsg('assistant', reply);
    } catch (e) {
        chatHideTyping();
        chatAddMsg('assistant', chatFallback(text));
    }
    chatBusy = false;
    sendBtn.disabled = false;
    setTimeout(() => input.focus(), 50);
}

function chipSend(el) {
    document.getElementById('chat-user-input').value = el.textContent.replace(/^[^\w\u00C0-\u024F]*/, '').trim();
    sendChatMessage();
}

function toggleChat() {
    document.getElementById('eleven-chat').classList.toggle('open');
}

function openChat() {
    document.getElementById('eleven-chat').classList.add('open');
    setTimeout(() => document.getElementById('chat-user-input').focus(), 300);
}

document.getElementById('chat-send').addEventListener('click', sendChatMessage);
document.getElementById('chat-user-input').addEventListener('keydown', e => { if (e.key === 'Enter') sendChatMessage(); });