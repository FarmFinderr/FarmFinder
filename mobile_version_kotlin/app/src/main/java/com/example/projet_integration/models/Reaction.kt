package com.example.projet_integration.models

data class Reaction(
    val _id: String,
    val postId: String,
    val userId: String,
    val type: String
)
