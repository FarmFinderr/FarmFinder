package com.example.projet_integration

import java.util.Date

data class Reaction (
    val postId: String,
    val userId: Int,
    val date : Date
)