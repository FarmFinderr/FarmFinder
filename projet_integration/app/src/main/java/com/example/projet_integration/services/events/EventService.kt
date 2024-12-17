package com.example.projet_integration.services.events

import com.example.projet_integration.models.Event
import retrofit2.Response
import retrofit2.http.Field
import retrofit2.http.FormUrlEncoded
import retrofit2.http.GET
import retrofit2.http.POST
import java.util.Date

interface EventService {

    @GET("GetAll")
    suspend fun getEvents(): Response<List<Event>>

    @FormUrlEncoded
    @POST("EventCreation/")
    suspend fun createEvent(
        @Field("photo") photo: String?,
        @Field("title") title: String?,
        @Field("description") description: String?,
        @Field("price") price: Long?,
        @Field("date_debut") dateDebut: String,
        @Field("date_fin") dateFin: String,
        @Field("owner_id") ownerId: String
    ): Response<Event>

}