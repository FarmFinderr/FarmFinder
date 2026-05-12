package com.example.projet_integration.services.participation

import com.example.projet_integration.services.users.UserService
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object ApiParticipation {

    private const val BASE_URL: String = "http://10.0.2.2:8880/events/"
    private val gson: Gson by lazy {
        GsonBuilder().setLenient().create()
    }

    private val httpClient: OkHttpClient by lazy {
        OkHttpClient.Builder().build()
    }
    private val retrofit: Retrofit by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .client(httpClient)
            .addConverterFactory(GsonConverterFactory.create(gson))
            .build()
    }


    val apiService: ParticipationService by lazy {
        retrofit.create(ParticipationService::class.java)
    }
}