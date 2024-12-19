package com.example.projet_integration

import com.example.projet_integration.models.Comment
import com.example.projet_integration.models.User
import java.util.Date

// Post data class
data class Post(
    val _id: String,
    val userId: String,
    val price: Double,
    val description: String,
    val type: String,
    val air: Int,
    val localisation: String,
    val date: String,
    val images: List<Image>,

)


