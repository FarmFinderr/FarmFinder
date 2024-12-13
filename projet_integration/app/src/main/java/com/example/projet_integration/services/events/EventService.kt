package com.example.projet_integration.services.events

import com.example.projet_integration.Event
import retrofit2.Response
import retrofit2.http.GET

interface EventService {

    @GET("GetAll")
    suspend fun getEvents(): Response<List<Event>>


}