document.getElementById('form-chat').addEventListener('submit', async function (e) {
    e.preventDefault();

    const input = document.getElementById('input-pergunta');
    const pergunta = input.value.trim();
    if (!pergunta) return;

    input.value = '';

    try {
        const response = await axios.post('/api/perguntar', { conteudo: pergunta });
        renderMensagens(response.data);
    } catch (err) {
        console.error('Erro ao enviar mensagem:', err);
    }
});

function renderMensagens(mensagens) {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = '';

    mensagens.forEach(msg => {
        const div = document.createElement('div');
        div.className = msg.remetente === 'usuario' ? 'mensagem usuario' : 'mensagem bot';
        div.innerHTML = `<p>${msg.conteudo}</p>`;
        chatBox.appendChild(div);
    });

    chatBox.scrollTop = chatBox.scrollHeight;
}
