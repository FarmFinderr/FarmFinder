package com.example.projet_integration.models

data class Participation(
    val id:String? = null,
    val  price :Long? = null,
    val person_id : String? = null,
    val event : Event? = null,
    val  user :User?= null
)
