package com.example.projet_integration.models

import java.util.Date

data class User(


    val  id : String,
    val name  : String,
    val lastName :  String,
    val  phoneNumber :  String,
    val date : Date,
    val sexe :  String  ,
    val  addresse : String,
    val  emailAdresse : String ,
    val  photo  : String ,
    val  role  : String,
    val password:String

    )
