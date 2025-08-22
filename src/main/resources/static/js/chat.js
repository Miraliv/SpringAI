// static/js/chat.js
document.addEventListener('DOMContentLoaded', () => {
    // --- SELETORES DOS ELEMENTOS ---
    const form = document.getElementById('form-chat');
    const input = document.getElementById('input-pergunta');
    const chatBox = document.getElementById('chat-box');
    const sendBtn = document.getElementById('send-btn');
    const emptyState = document.getElementById('empty-state');
    const messageWrapper = chatBox.querySelector('.max-w-4xl');

    if (!form || !input || !chatBox || !messageWrapper) {
        console.error('[chat.js] Elementos essenciais não encontrados.');
        return;
    }

    // --- FUNÇÕES AUXILIARES ---

    function scrollToBottom(behavior = 'smooth') {
        chatBox.scrollTo({ top: chatBox.scrollHeight, behavior });
    }

    function clearEmptyState() {
        if (emptyState && emptyState.style.display !== 'none') {
            emptyState.style.display = 'none';
        }
    }

    function escapeHtml(str) {
        return (str ?? '').toString()
            .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;').replaceAll("'", '&#039;');
    }

    function parseUserInputToHtml(text) {
        return escapeHtml(text).replace(/\n/g, '<br/>');
    }

    // --- FUNÇÕES DE CRIAÇÃO DE BALÕES DE CHAT ---

    function createUserBubble(text) {
        const wrap = document.createElement('div');
        wrap.className = 'chat chat-end';
        wrap.innerHTML = `<div class="chat-bubble chat-bubble-primary">${parseUserInputToHtml(text)}</div>`;
        messageWrapper.appendChild(wrap);
    }

    function createBotBubble(htmlContent) {
        const wrap = document.createElement('div');
        wrap.className = 'chat chat-start';
        wrap.innerHTML = `<div class="chat-bubble">${htmlContent}</div>`;
        messageWrapper.appendChild(wrap);
    }

    function createTypingBubble() {
        const wrap = document.createElement('div');
        wrap.className = 'chat chat-start typing-indicator';
        wrap.innerHTML = `<div class="chat-bubble"><span class="loading loading-dots loading-md"></span></div>`;
        messageWrapper.appendChild(wrap);
        scrollToBottom();
        return wrap;
    }

    function replaceTypingWithContent(typingWrap, htmlContent) {
        typingWrap.classList.remove('typing-indicator');
        typingWrap.innerHTML = `<div class="chat-bubble">${htmlContent}</div>`;
        scrollToBottom();
    }

    function appendErrorBubble(msg) {
        const wrap = document.createElement('div');
        wrap.className = 'chat chat-start';
        wrap.innerHTML = `<div class="chat-bubble bg-error text-error-content">${escapeHtml(msg)}</div>`;
        messageWrapper.appendChild(wrap);
        scrollToBottom();
    }

    // --- FUNÇÃO PRINCIPAL DE ENVIO ---

    async function handleFormSubmit(ev) {
        ev.preventDefault();
        const pergunta = input.value.trim();
        if (!pergunta) return;

        clearEmptyState();
        createUserBubble(pergunta);
        scrollToBottom();
        const typingWrap = createTypingBubble();

        input.value = '';
        autoResize();
        input.focus();

        try {
            const resp = await axios.post('/api/perguntar', { conteudo: pergunta });

            // ### CORREÇÃO PRINCIPAL AQUI ###
            // Lógica para extrair a resposta do bot de um array
            let respostaHtmlDoBot = "Desculpe, não entendi a resposta."; // Mensagem padrão

            if (Array.isArray(resp.data) && resp.data.length > 0) {
                // Pega o último item do array, que deve ser a resposta do bot
                const lastMessage = resp.data[resp.data.length - 1];
                if (lastMessage && lastMessage.remetente === 'bot' && lastMessage.conteudo) {
                    respostaHtmlDoBot = lastMessage.conteudo;
                }
            } else if (typeof resp.data === 'object' && resp.data?.conteudo) {
                 // Mantém a compatibilidade caso a API mude para o formato de objeto
                 respostaHtmlDoBot = resp.data.conteudo;
            }

            replaceTypingWithContent(typingWrap, respostaHtmlDoBot);

        } catch (err) {
            typingWrap.remove();
            const msg = err?.response?.data?.message || err?.message || 'Erro ao contactar o servidor.';
            appendErrorBubble(msg);
        }
    }

    // --- FUNÇÕES DE APOIO (HISTÓRICO E SUGESTÕES) ---

    function loadHistory(history) {
        if (!history || history.length === 0) return;

        clearEmptyState();

        history.forEach(message => {
            if (message.remetente === 'usuario') {
                createUserBubble(message.conteudo);
            } else if (message.remetente === 'bot') {
                createBotBubble(message.conteudo);
            }
        });

        setTimeout(() => scrollToBottom('auto'), 0);
    }

    function setupSuggestionButtons() {
        const suggestionButtons = emptyState.querySelectorAll('.btn');
        suggestionButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const suggestionText = btn.innerText;
                input.value = suggestionText;
                input.dispatchEvent(new Event('input', { bubbles: true }));
                form.requestSubmit();
            });
        });
    }

    // --- EVENT LISTENERS E INICIALIZAÇÃO ---

    form.addEventListener('submit', handleFormSubmit);

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!sendBtn.disabled) {
                form.requestSubmit();
            }
        }
    });

    function autoResize() {
        const hasText = input.value.trim().length > 0;
        sendBtn.disabled = !hasText;
        input.style.height = 'auto';
        input.style.height = `${Math.min(input.scrollHeight, 256)}px`;
    }

    input.addEventListener('input', autoResize);
    input.addEventListener('paste', () => setTimeout(autoResize, 0));

    // --- PONTO DE PARTIDA ---
    console.log('[chat.js] Inicializado com sucesso.');
    setupSuggestionButtons();
    autoResize();
});