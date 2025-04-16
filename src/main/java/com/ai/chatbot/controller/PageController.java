package com.ai.chatbot.controller;

import com.ai.chatbot.service.ChatService;
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