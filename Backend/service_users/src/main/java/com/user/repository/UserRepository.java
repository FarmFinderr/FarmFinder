package com.user.repository;

import java.util.List;

import com.user.entities.userStats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.user.entities.User;

public interface UserRepository extends JpaRepository<User, String> {
    @Query("SELECT u FROM User u WHERE " +
           "(LOWER(u.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(u.emailAddress) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<User> searchUsers(@Param("search") String search);

    @Query("SELECT new com.user.entities.userStats(u.date, COUNT(u)) FROM User u GROUP BY u.date ORDER BY u.date DESC")
    List<userStats> countUsersCreatedByDay();
}
