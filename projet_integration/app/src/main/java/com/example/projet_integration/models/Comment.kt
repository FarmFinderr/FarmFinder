package com.example.projet_integration.models

data class Comment(
    val _id: String,
    val postId: String,
    val userId: String,
    val content: String,
    val date: String
)

