package com.message.services;

import com.message.entities.ChatMessage;
import com.message.repositories.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChatMessageService {

    @Autowired
    private ChatMessageRepository chatMessageRepository;
    
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public ChatMessage saveMessage(ChatMessage chatMessage) {
    	ChatMessage savedMessage = chatMessageRepository.save(chatMessage);
        messagingTemplate.convertAndSend("/topic/messages", savedMessage);
        return savedMessage;
    }

    public List<ChatMessage> getAllMessages() {
        return chatMessageRepository.findAll();
    }

    public ChatMessage updateMessage(Long id, ChatMessage chatMessage) {
        Optional<ChatMessage> existingMessage = chatMessageRepository.findById(id);
        if (existingMessage.isPresent()) {
            ChatMessage updatedMessage = existingMessage.get();
            updatedMessage.setContent(chatMessage.getContent());
            updatedMessage.setSender(chatMessage.getSender());
            return chatMessageRepository.save(updatedMessage);
        }
        throw new RuntimeException("Message not found!");
    }

    public void deleteMessage(Long id) {
        chatMessageRepository.deleteById(id);
    }
}
