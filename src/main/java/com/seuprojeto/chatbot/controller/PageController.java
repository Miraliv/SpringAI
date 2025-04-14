package com.seuprojeto.chatbot.controller;

import com.seuprojeto.chatbot.service.ChatService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class PageController {

    private final ChatService chatService;

    public PageController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping("/")
    public String index() {
        return "chat";
    }
}