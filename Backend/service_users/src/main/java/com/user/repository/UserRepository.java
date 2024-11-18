package com.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.user.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
