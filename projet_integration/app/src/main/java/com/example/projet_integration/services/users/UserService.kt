package com.example.projet_integration.services.users

import com.example.projet_integration.models.User
import com.example.tp6withretrofit.AccessToken
import retrofit2.Response
import retrofit2.http.Field
import retrofit2.http.FormUrlEncoded
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST
import retrofit2.http.Path
import retrofit2.http.Query

interface UserService {
    @GET("/")
    suspend fun getUsers(): Response<List<User>>

    @GET("{id}")
    suspend fun getUserById(
        @Path("id") userId: String
    ):Response<User>
    @POST("login")
    suspend fun login(
        @Query("username") username: String,
        @Query("password") password: String
    ): AccessToken

    @FormUrlEncoded
    @POST("realms/FarmFinder/protocol/openid-connect/token")
    suspend fun getAccessToken(
        @Field("client_id") clientId: String,
        @Field("grant_type") grantType: String,
        @Field("client_secret") clientSecret: String,
        @Field("scope") scope: String,
        @Field("username") username: String,
        @Field("password") password: String
    ): Response<AccessToken>
}