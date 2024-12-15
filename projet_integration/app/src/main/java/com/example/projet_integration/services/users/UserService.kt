package com.example.projet_integration.services.users

import com.example.projet_integration.models.User
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Path

interface UserService {
    @GET("/")
    suspend fun getUsers(): Response<List<User>>

    @GET("/{id}")
    suspend fun getUserById(
        @Path("id") userId: String
    ):Response<User>
}