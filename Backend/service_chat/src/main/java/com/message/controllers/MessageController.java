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
import com.message.entities.Notification;
import com.message.services.ChatMessageService;
import com.message.services.NotificationService;

import java.util.List;

@Controller
@RequestMapping("/chats")
public class MessageController {

    @Autowired
    private ChatMessageService chatMessageService;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    private NotificationService notificationService;

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(
            @Payload ChatMessage chatMessage
    ) {
    	 // Save the chat message
        ChatMessage savedMessage = chatMessageService.saveMessage(chatMessage);

        // Create and send a notification
        Notification notification = new Notification();
        notification.setSender(chatMessage.getSender());
        notification.setReceiver(chatMessage.getReceiver()); 
        notification.setContent(chatMessage.getContent());
        notification.setTimestamp(String.valueOf(System.currentTimeMillis()));

        // Save notification to database
        notificationService.saveNotification(notification);

        // Send notification in real time
        simpMessagingTemplate.convertAndSend("/topic/notifications", notification);

        return savedMessage;
        
    }
    // Add Delete Notification Endpoint
    @DeleteMapping("/notifications/delete/{id}")
    @ResponseBody
    public String deleteNotification(@PathVariable Long id) {
        notificationService.deleteNotification(id);
        return "Notification deleted successfully!";
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
    @GetMapping("/notifications")
    @ResponseBody
    public List<Notification> getAllNotifications() {
        return notificationService.getAllNotifications();
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