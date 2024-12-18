package com.example.projet_integration

import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.ImageButton
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.projet_integration.models.Event
import com.example.projet_integration.services.events.ApiEvents
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class ParticipationActivity : AppCompatActivity() {
    private lateinit var recyclerView: RecyclerView
    private lateinit var participationAdapter: ParticipationAdapter
    private lateinit var Shared: SharedPreferences

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_participation)

        // Get references to UI components
        val eventImageView: ImageView = findViewById(R.id.eventImageView)
        val eventTitleTextView: TextView = findViewById(R.id.eventTitleTextView)
        val eventDescriptionTextView: TextView = findViewById(R.id.eventDescriptionTextView)
        val eventDateTextView: TextView = findViewById(R.id.eventDateTextView)
        val eventPriceTextView: TextView = findViewById(R.id.eventPriceTextView)
        val btn_participate: Button = findViewById(R.id.btn_search)
        val value_sent: EditText = findViewById(R.id.value_send)
        recyclerView = findViewById(R.id.recycleuser)
        Shared = SharedPreferences(this)

        // Set up RecyclerView
        recyclerView.layoutManager = LinearLayoutManager(this)

        // Retrieve event ID from Intent
        val eventId = intent.getIntExtra("id", 0)
        if (eventId == 0) {
            Toast.makeText(this, "Invalid Event ID", Toast.LENGTH_SHORT).show()
            finish()
            return
        }
        val backButton: ImageButton = findViewById(R.id.button_back2)

        // Set click listener
        backButton.setOnClickListener {
            // Finish the current activity to return to the previous one
            finish()
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
                        Toast.makeText(this@ParticipationActivity, "Failed to fetch event details.", Toast.LENGTH_SHORT).show()
                    }
                } else {
                    Toast.makeText(this@ParticipationActivity, "Error: ${response.code()}", Toast.LENGTH_SHORT).show()
                }
            } catch (e: Exception) {
                Log.e("Event Fetch Error", e.message ?: "Unknown error")
                Toast.makeText(this@ParticipationActivity, "Failed to load event details.", Toast.LENGTH_SHORT).show()
            }
        }

        // Set participate button click listener
        btn_participate.setOnClickListener {
            val priceInput = value_sent.text.toString()

            if (priceInput.isNotEmpty()) {
                scope.launch {
                    try {
                        // Submit the participation value
                        val id_user =  Shared.getValueString("id").toString()
                        val response2 = ApiEvents.apiService.EventRegistration(
                            price = priceInput.toLong(),
                            event_id = eventId,
                            person_id =id_user
                        )

                        if (response2.isSuccessful) {
                            // Refresh participant list after successful registration
                            refreshParticipantList(eventId)
                        } else {
                            Toast.makeText(this@ParticipationActivity, "Registration failed", Toast.LENGTH_SHORT).show()
                            Log.i("success","${id_user} ${priceInput.toLong()}, ${eventId}")
                            Log.e("error reg","$response2")

                        }
                    } catch (e: Exception) {
                        Log.e("Registration Error", e.message ?: "Unknown error")
                        Toast.makeText(this@ParticipationActivity, "Failed to register participation.", Toast.LENGTH_SHORT).show()
                    }
                }
            } else {
                Toast.makeText(this@ParticipationActivity, "Please enter a value to participate", Toast.LENGTH_SHORT).show()
            }
        }

        // Initial fetch of registered users
        refreshParticipantList(eventId)
    }

    // Function to refresh participant list
    private fun refreshParticipantList(eventId: Int) {
        val scope = CoroutineScope(Dispatchers.Main)
        scope.launch {
            try {
                // Fetch updated list of registered users
                val response = ApiEvents.apiService.GetRegistratedUser(eventId)
                if (response.isSuccessful) {
                    val users = response.body() ?: emptyList()
                    if (users.isNotEmpty()) {
                        participationAdapter = ParticipationAdapter(users)  // Initializing with an empty list
                        recyclerView.adapter = participationAdapter
                        participationAdapter.notifyDataSetChanged()  // Notify adapter about data change
                        Log.i("users","${response.body()}")
                    } else {
                        Toast.makeText(this@ParticipationActivity, "No users registered.", Toast.LENGTH_SHORT).show()
                    }
                } else {
                    Toast.makeText(this@ParticipationActivity, "Error: ${response.code()}", Toast.LENGTH_SHORT).show()
                }
            } catch (e: Exception) {
                Log.e("Participants Fetch Error", e.message ?: "Unknown error")
                Toast.makeText(this@ParticipationActivity, "Failed to load participants.", Toast.LENGTH_SHORT).show()
            }
        }
    }
}
