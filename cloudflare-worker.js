/* =========================================================
   NEXA WEB — PROXY CHATBOT (Cloudflare Worker)

   Ce fichier n'est PAS servi par le site. C'est le code à déployer
   sur Cloudflare Workers pour faire le pont entre chatbot.js (public)
   et l'API Anthropic (clé secrète, jamais exposée au navigateur).

   DÉPLOIEMENT (gratuit, ~5 min) :
   1. Crée un compte sur https://dash.cloudflare.com (gratuit)
   2. Va dans "Workers & Pages" → "Create" → "Create Worker"
   3. Donne-lui un nom, ex: nexaweb-chatbot
   4. Remplace tout le code par défaut par celui-ci, clique "Deploy"
   5. Va dans Settings → Variables → "Add variable" :
        - Nom : ANTHROPIC_API_KEY
        - Valeur : ta vraie clé API Anthropic
        - Coche "Encrypt" pour qu'elle soit stockée comme secret
   6. Note l'URL du Worker (ex: https://nexaweb-chatbot.tonpseudo.workers.dev)
   7. Colle cette URL dans chatbot.js, dans la constante CHAT_PROXY_URL
   8. (Recommandé) Une fois ton site en ligne, remplace '*' ci-dessous
      par ton vrai nom de domaine dans ALLOWED_ORIGIN pour empêcher
      d'autres sites d'utiliser ton Worker (et donc ton quota API).
   ========================================================= */

const ALLOWED_ORIGIN = '*'; // ex: 'https://nexaweb.fr' une fois le site en ligne

const SYSTEM_PROMPT_FR = `Tu es l'assistant virtuel de Nexa Web, une agence de création de sites internet basée à Carvin. Réponds uniquement en français, de façon courte et professionnelle. Services : site vitrine (490€, 5-7 jours), site e-commerce (890€, 10-15 jours), refonte de site, SEO. Contact : 06 98 84 01 94, contact.nexaweb62@gmail.com. Si la question est complexe dis : "Contactez-nous au 06 98 84 01 94 ou via le formulaire." Si pas de réponse au 06 98 84 01 94, appelez le 06 41 46 78 98. Ne réponds qu'aux questions liées à Nexa Web.`;

const SYSTEM_PROMPT_EN = `You are the virtual assistant of Nexa Web, a web design agency based in Carvin, France. Reply only in English, briefly and professionally. Services: showcase website (from €490, 5-7 days), e-commerce (from €890, 10-15 days), website redesign, SEO. Contact: 06 98 84 01 94, contact.nexaweb62@gmail.com. If question is complex say: Contact us at 06 98 84 01 94 or via the contact form. Only answer questions related to Nexa Web.`;

export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'method_not_allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    try {
      const { messages, lang } = await request.json();
      const systemPrompt = lang === 'en' ? SYSTEM_PROMPT_EN : SYSTEM_PROMPT_FR;

      const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 300,
          system: systemPrompt,
          messages
        })
      });

      const data = await anthropicResponse.json();

      return new Response(JSON.stringify(data), {
        status: anthropicResponse.status,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'proxy_error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
  }
};
