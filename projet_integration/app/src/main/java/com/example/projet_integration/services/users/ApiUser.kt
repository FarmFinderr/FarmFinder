package com.example.projet_integration.services.users

import com.example.projet_integration.services.events.EventService
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object ApiUser {
    private const val BASE_URL: String = "http://10.0.2.2:8880/users/"
    private const val BASE_URL2: String = "http://10.0.2.2:8050/"
    private const val BASE_URL3: String = "http://192.168.56.1:8083/users"
    private const val BASE_URL4: String = "http://192.168.56.1:8080/"


    private val gson: Gson by lazy {
        GsonBuilder().setLenient().create()
    }

    private val httpClient: OkHttpClient by lazy {
        OkHttpClient.Builder().build()
    }
    private val retrofit: Retrofit by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL3)
            .client(httpClient)
            .addConverterFactory(GsonConverterFactory.create(gson))
            .build()
    }
    private val retrofit2: Retrofit by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL4)
            .client(httpClient)
            .addConverterFactory(GsonConverterFactory.create(gson))
            .build()
    }



    val apiService: UserService by lazy {
        retrofit.create(UserService::class.java)
    }
    val apiService_keycloack: UserService by lazy {
        retrofit2.create(UserService::class.java)
    }

}