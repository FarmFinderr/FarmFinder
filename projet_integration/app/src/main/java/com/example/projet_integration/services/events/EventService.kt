package com.example.projet_integration.services.events

import com.example.projet_integration.models.Event
import com.example.projet_integration.models.Participation
import retrofit2.Response
import retrofit2.http.Field
import retrofit2.http.FormUrlEncoded
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path
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

    @GET("/UsersRegistrated/{id}")
    suspend fun GetRegistratedUser(@Path ("id") id: String ) : Response<List<Participation>>

    @GET("Event/{id}")
    suspend fun GetEvent(@Path ("id") id: Int ) : Response<Event>
}