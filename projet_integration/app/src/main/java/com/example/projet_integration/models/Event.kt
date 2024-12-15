package com.example.projet_integration.models

import java.util.Date

data class Event(

    val id: Int? = null,
    val price: Double?,
    val status: Boolean?,
    val owner_id: String,
    val date_debut: Date?,
    val date_fin: Date?,
    val description: String,
    val title:  String?,
    val photo: String?,
    val owner: User,
    val users: ArrayList<User>
)
