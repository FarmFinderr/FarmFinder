package com.example.projet_integration.services.events

import com.example.projet_integration.models.Event
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST

interface EventService {

    @GET("GetAll")
    suspend fun getEvents(): Response<List<Event>>
    @POST("EventCreation/")
    suspend fun createEvent(
        @Body event:Event
    ):Response<Event>

}