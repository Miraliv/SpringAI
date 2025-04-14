package com.seuprojeto.chatbot.model;

import lombok.Data;


@Data
public class Mensagem {
    private String remetente; // "usuario" ou "bot"
    private String conteudo;

    public Mensagem() {
    }

    public Mensagem(String remetente, String conteudo) {
        this.remetente = remetente;
        this.conteudo = conteudo;
    }
}
