package com.ai.chatbot.controller;

import com.ai.chatbot.model.Mensagem;
import com.ai.chatbot.service.ChatService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ChatRestController {

    private final ChatService chatService;

    public ChatRestController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/perguntar")
    public ResponseEntity<List<Mensagem>> perguntar(@RequestBody Mensagem pergunta, HttpSession session) {
        List<Mensagem> historico = (List<Mensagem>) session.getAttribute("historico");
        if (historico == null) {
            historico = new ArrayList<>();
        }

        historico.add(new Mensagem("usuario", pergunta.getConteudo()));

        // Concatena todo o histórico para o prompt
        StringBuilder promptCompleto = new StringBuilder();
        for (Mensagem m : historico) {
            promptCompleto.append(m.getRemetente()).append(": ").append(m.getConteudo()).append("\n");
        }

        String resposta = chatService.perguntar(promptCompleto.toString());

        Mensagem respostaMensagem = new Mensagem("bot", resposta);
        historico.add(respostaMensagem);

        session.setAttribute("historico", historico);

        return ResponseEntity.ok(historico);
    }
}
