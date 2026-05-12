package com.example.projet_integration.services.reclamation

import com.example.projet_integration.models.Participation
import com.example.projet_integration.models.Reclamation
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.Field
import retrofit2.http.FormUrlEncoded
import retrofit2.http.POST

interface ReclamationService {

    @POST("create/")
    suspend fun createReclamation(
       @Body reclamation:Reclamation
    ): Response<Reclamation>
}