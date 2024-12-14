package com.example.projet_integration.services.users

import com.example.projet_integration.Event
import com.example.projet_integration.User
import retrofit2.Response
import retrofit2.http.GET

interface UserService {
    @GET("/")
    suspend fun getEvents(): Response<List<User>>
}