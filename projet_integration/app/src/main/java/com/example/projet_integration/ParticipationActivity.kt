package com.example.projet_integration

import android.os.Bundle
import android.util.Log
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.projet_integration.models.Event
import com.example.projet_integration.services.events.ApiEvents
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class ParticipationActivity : AppCompatActivity() {
    private lateinit var recyclerView: RecyclerView
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_participation)

        // Get references to UI components
        val eventImageView: ImageView = findViewById(R.id.eventImageView)
        val eventTitleTextView: TextView = findViewById(R.id.eventTitleTextView)
        val eventDescriptionTextView: TextView = findViewById(R.id.eventDescriptionTextView)
        val eventDateTextView: TextView = findViewById(R.id.eventDateTextView)
        val eventPriceTextView: TextView = findViewById(R.id.eventPriceTextView)
        
        // Retrieve event ID from Intent
        val eventId = intent.getIntExtra("id", 0)
        if (eventId == 0) {
            Toast.makeText(this, "Invalid Event ID", Toast.LENGTH_SHORT).show()
            finish()
            return
        }

        // Fetch event details
        val scope = CoroutineScope(Dispatchers.Main)
        scope.launch {
            try {
                val response = ApiEvents.apiService.GetEvent(eventId)
                if (response.isSuccessful) {
                    val event = response.body()
                    if (event != null) {
                        // Populate UI with event details
                        eventTitleTextView.text = event.title ?: "No Title Available"
                        eventDescriptionTextView.text = event.description
                        eventDateTextView.text = "Start: ${event.date_debut} | End: ${event.date_fin}"
                        eventPriceTextView.text = "Price: $${event.price ?: 0.0}"

                        // Load image using Glide
                        Glide.with(this@ParticipationActivity)
                            .load(event.photo)
                            .placeholder(R.drawable.logo) // Add a default placeholder
                            .into(eventImageView)
                    } else {
                        Toast.makeText(
                            this@ParticipationActivity,
                            "Failed to fetch event details.",
                            Toast.LENGTH_SHORT
                        ).show()
                    }
                } else {
                    Toast.makeText(
                        this@ParticipationActivity,
                        "Error: ${response.code()}",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            } catch (e: Exception) {
                Log.e("Event Fetch Error", e.message ?: "Unknown error")
                Toast.makeText(this@ParticipationActivity, "Failed to load event details.", Toast.LENGTH_SHORT).show()
            }
        }



        scope.launch {
            try {
                val response = ApiEvents.apiService.GetRegistratedUser(eventId.toString())
                if (response.isSuccessful) {
                    val users = response.body()
                    if (users != null) {
                        // Populate RecyclerView

                        usersRecyclerView.adapter = ParticipationAdapter(users)
                    } else {
                        Toast.makeText(this@ParticipationActivity, "No users registered.", Toast.LENGTH_SHORT).show()
                    }
                } else {
                    Toast.makeText(this@ParticipationActivity, "Error: ${response.code()}", Toast.LENGTH_SHORT).show()
                }
            } catch (e: Exception) {
                Log.e("Users Fetch Error", e.message ?: "Unknown error")
                Toast.makeText(this@ParticipationActivity, "Failed to load registered users.", Toast.LENGTH_SHORT).show()
            }
        }
    }





    }
}
