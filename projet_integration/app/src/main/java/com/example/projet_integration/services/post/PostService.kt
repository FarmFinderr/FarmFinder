package com.example.projet_integration.services.post

import retrofit2.Response
import retrofit2.http.GET

interface PostService {
    @GET("get")
    suspend fun getPosts():Response<List<Post>>
}