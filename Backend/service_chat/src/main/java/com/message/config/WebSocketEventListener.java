package com.message.config;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.message.entities.ChatMessage;

@Component

public class WebSocketEventListener {

    private final SimpMessageSendingOperations messagingTemplate;

    public WebSocketEventListener(SimpMessageSendingOperations messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        String username = (String) headerAccessor.getSessionAttributes().get("username");
        if (username != null) {
            System.out.println("User disconnected: " + username);

            ChatMessage chatMessage = new ChatMessage.Builder()
                    .sender(username)
                    .receiver(username)
                    .content("User has left the chat") 
                    .timestamp(String.valueOf(System.currentTimeMillis())) 
                    .build();

            messagingTemplate.convertAndSend("/topic/public", chatMessage);
        }
    }
}