package com.example.projet_integration.services.post
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object ApiPost {
    private const val BASE_URL: String = "http://10.0.2.2:8880/posts/"
    private const val BASE_URL2: String = "http://192.168.56.1:5000/posts/"


    private val gson: Gson by lazy {
        GsonBuilder().setLenient().create()
    }

    private val httpClient: OkHttpClient by lazy {
        OkHttpClient.Builder().build()
    }

    private val retrofit: Retrofit by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL2)
            .client(httpClient)
            .addConverterFactory(GsonConverterFactory.create(gson))
            .build()
    }

    val apiService: PostService by lazy {
        retrofit.create(PostService::class.java)
    }
}



