/* =========================================================
   NEXA WEB — CHATBOT
   Ce script n'embarque AUCUNE clé API : il appelle un proxy
   (Cloudflare Worker) qui détient la clé Anthropic côté serveur.
   Voir cloudflare-worker.js pour le code du proxy à déployer.
   ========================================================= */

// À remplacer par l'URL de ton Worker une fois déployé (ex: https://nexaweb-chatbot.ton-compte.workers.dev)
const CHAT_PROXY_URL = 'https://shy-art-5483.contact-nexaweb62.workers.dev';

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('chatbot-toggle');
  const chatWindow = document.getElementById('chatbot-window');
  const closeBtn = document.getElementById('chatbot-close');
  const form = document.getElementById('chatbot-form');
  const input = document.getElementById('chatbot-input');
  const messagesEl = document.getElementById('chatbot-messages');

  if (!toggleBtn) return;

  const conversation = [];
  let hasOpened = false;

  function stripMarkdown(text) {
    return text
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/\*(.+?)\*/g, '$1');
  }

  function addMessage(role, text) {
    const bubble = document.createElement('div');
    bubble.className = `chatbot-bubble chatbot-bubble--${role}`;
    bubble.textContent = text;
    messagesEl.appendChild(bubble);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return bubble;
  }

  function openChat() {
    chatWindow.classList.add('is-open');
    toggleBtn.classList.add('is-open');
    toggleBtn.setAttribute('aria-expanded', 'true');

    if (!hasOpened) {
      hasOpened = true;
      addMessage('assistant', t('chatbot.welcome'));
    }
  }

  function closeChat() {
    chatWindow.classList.remove('is-open');
    toggleBtn.classList.remove('is-open');
    toggleBtn.setAttribute('aria-expanded', 'false');
  }

  toggleBtn.addEventListener('click', () => {
    chatWindow.classList.contains('is-open') ? closeChat() : openChat();
  });

  closeBtn.addEventListener('click', closeChat);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const text = input.value.trim();
    if (!text) return;

    addMessage('user', text);
    conversation.push({ role: 'user', content: text });
    input.value = '';
    input.disabled = true;

    const typingBubble = addMessage('assistant', '...');
    typingBubble.classList.add('chatbot-bubble--typing');

    try {
      console.log('[Nexa Web Chatbot] Envoi vers le Worker :', CHAT_PROXY_URL, conversation);

      const response = await fetch(CHAT_PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversation, lang: getCurrentLang() })
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error('[Nexa Web Chatbot] Réponse non-OK du Worker :', response.status, errorBody);
        throw new Error(`Réponse proxy invalide (${response.status})`);
      }

      const data = await response.json();
      console.log('[Nexa Web Chatbot] Réponse reçue :', data);

      const reply = data?.content?.[0]?.text?.trim();

      if (!reply) {
        console.error('[Nexa Web Chatbot] Aucun texte exploitable dans la réponse :', data);
        throw new Error('Réponse vide');
      }

      typingBubble.remove();
      addMessage('assistant', stripMarkdown(reply));
      conversation.push({ role: 'assistant', content: reply });
    } catch (error) {
      console.error('[Nexa Web Chatbot] Erreur lors de l\'envoi du message :', error);
      typingBubble.remove();
      addMessage('assistant', t('chatbot.error'));
    } finally {
      input.disabled = false;
      input.focus();
    }
  });
});
