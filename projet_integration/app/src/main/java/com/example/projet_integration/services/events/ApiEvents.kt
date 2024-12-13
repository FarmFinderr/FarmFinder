package com.example.projet_integration.services.events

import com.google.gson.GsonBuilder
import com.google.gson.Gson
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
object ApiEvents {
    private const val BASE_URL: String = "http://10.0.2.2:8888/events/"
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



    val apiService: EventService by lazy {
        retrofit.create(EventService::class.java)
    }

}