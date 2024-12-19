package com.example.projet_integration.services.post

import com.example.projet_integration.Post
import okhttp3.ResponseBody
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Path

interface PostService {
        @GET("get")
        suspend fun getPosts(): Response<List<Post>>

    @GET("{id}")
    suspend fun getpost(@Path ("id") id : String):Response<Post>
}