package com.example.projet_integration.models

data class Post(
    val name: String,
    val date: String,
    val content: String,
    val likes: Int,
    val imageUrl: String? = null,
    val localImageResId: Int? = null
)