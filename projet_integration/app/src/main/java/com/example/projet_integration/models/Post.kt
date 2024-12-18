package com.example.projet_integration
import  java.util.Date
data class Post(
    val id:String?=null ,
    val userId: Int,
    val price: Double,
    val description: String,
    val type: String,
    val air: Int,
    val localisation: String,
    val date :Date,
    val images:Array<Image>,
    val vedios : Array<Video>,
    val reactions : Array<Reaction>
)