package com.example.projet_integration.models

import java.util.Date

data class User(


    val  id : String,
    val name  : String,
    val lastName :  String,
    val  phoneNumber :  Int,
    val date : Date,
    val sexe :  Int  ,
    val  addresse : String,
    val  emailAdresse : String ,
    val  photo  : String ,
    val  role  : Int

    )
