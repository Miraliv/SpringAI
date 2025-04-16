package com.ai.chatbot.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private final ChatClient chatClient;

    public ChatService(ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    public String perguntar(String pergunta) {
        String respostaBruta = chatClient.prompt(pergunta).call().content();
        return formatarMarkdownSimples(respostaBruta);
    }

    private String formatarMarkdownSimples(String texto) {
        if (texto == null) return "";

        // Negrito: **texto**
        texto = texto.replaceAll("\\*\\*(.*?)\\*\\*", "<strong>$1</strong>");

        // Itálico: *texto* ou _texto_
        texto = texto.replaceAll("(?<!\\*)\\*(?!\\*)(.*?)\\*(?!\\*)", "<em>$1</em>");
        texto = texto.replaceAll("_(.*?)_", "<em>$1</em>");

        // Título: ### Título
        texto = texto.replaceAll("(?m)^### (.*)", "<h3>$1</h3>");

        // Títulos simples isolados
        texto = texto.replaceAll("(?m)^(Receita de Bolo|Ingredientes|Preparação|Título em Destaque)$", "<h2>$1</h2>");

        // Quebra de parágrafos duplos
        texto = texto.replaceAll("(\r\n|\n){2,}", "<br><br>");
        // Quebra de linha simples
        texto = texto.replaceAll("(\r\n|\n)", "<br>");

        // Lista com * item
        // Envolve todos os <li> seguidos com <ul> corretamente
        texto = texto.replaceAll("(?m)^\\* (.*)", "<li>$1</li>");
        texto = texto.replaceAll("(?s)(<li>.*?</li>)", "<ul>$1</ul>");
        texto = texto.replaceAll("</ul><ul>", ""); // remove agrupamento duplicado

        return texto;
    }
}
