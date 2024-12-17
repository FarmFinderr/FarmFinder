package com.message.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.message.entities.ChatMessage;
import com.message.services.ChatMessageService;

import java.util.List;

@Controller
@RequestMapping("/chats")
public class MessageController {

    @Autowired
    private ChatMessageService chatMessageService;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(
            @Payload ChatMessage chatMessage
    ) {
        return chatMessageService.saveMessage(chatMessage);
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatMessage addUser(
            @Payload ChatMessage chatMessage,
            SimpMessageHeaderAccessor headerAccessor
    ) {
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        return chatMessage;
    }

    @PostMapping("/create")
    @ResponseBody
    public ChatMessage createMessage(@RequestBody ChatMessage chatMessage) {
        ChatMessage savedMessage = chatMessageService.saveMessage(chatMessage);

        simpMessagingTemplate.convertAndSend("/topic/public", savedMessage);

        return savedMessage; 
    }

    @GetMapping("/read")
    @ResponseBody
    public List<ChatMessage> getAllMessages() {
        return chatMessageService.getAllMessages();
        
    }

    @PutMapping("/update/{id}")
    @ResponseBody
    public ChatMessage updateMessage(
            @PathVariable Long id,
            @RequestBody ChatMessage chatMessage
    ) {
        return chatMessageService.updateMessage(id, chatMessage);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseBody
    public String deleteMessage(@PathVariable Long id) {
        chatMessageService.deleteMessage(id);
        return "Message deleted successfully!";
    }
}
