package com.message.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.message.entities.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
}

