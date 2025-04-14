package com.seuprojeto.chatbot.controller;

import com.seuprojeto.chatbot.service.ChatService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping("/")
    public String index() {
        return "chat";
    }

    @PostMapping("/perguntar")
    public String perguntar(@RequestParam(name = "pergunta") String pergunta, Model model) {
        String resposta = chatService.perguntar(pergunta);
        model.addAttribute("pergunta", pergunta);
        model.addAttribute("resposta", resposta);
        return "chat";
    }
}