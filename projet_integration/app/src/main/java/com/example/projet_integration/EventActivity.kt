package com.example.projet_integration

import EventAdapter
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.ImageButton
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.projet_integration.models.Event
import com.example.projet_integration.services.events.ApiEvents
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class EventActivity : AppCompatActivity() {



    private lateinit var recyclerView: RecyclerView
    private lateinit var adapter: EventAdapter
    private val listevents = ArrayList<Event>()
    private lateinit var search:EditText
    private lateinit var submit:Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_event)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.event)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        val recyclerView: RecyclerView = findViewById(R.id.eventsRecyclerView)
        recyclerView.layoutManager = LinearLayoutManager(this)
        search = findViewById(R.id.search_bar)
        submit =  findViewById(R.id.btn_search)


        val scope = CoroutineScope(Dispatchers.Main)
        scope.launch {

                try{
                    val response  = ApiEvents.apiService.getEvents();
                    adapter =EventAdapter(this@EventActivity, listevents)
                    recyclerView.adapter =  adapter;
                    listevents.clear();
                    listevents.addAll(response.body()!!);
                    adapter.notifyDataSetChanged()

                    Log.i("success", response.body()!!.toString())
                }
                catch(e:Exception)
                {
                    Toast.makeText(this@EventActivity, "Error Occurred: ${e.message}", Toast.LENGTH_LONG).show()
                    Log.e("API Error", "Response code:  ${e.message} ")
                }

        }
        val backButton: ImageButton = findViewById(R.id.button_back)

        // Set click listener
        backButton.setOnClickListener {
            // Finish the current activity to return to the previous one
            finish()
        }
        submit.setOnClickListener {
            scope.launch {
                try {
                    val response = ApiEvents.apiService.searchEvents(search = search.text.toString())
                    if (response.isSuccessful && response.body() != null) {
                        listevents.clear()
                        listevents.addAll(response.body()!!)
                        adapter.notifyDataSetChanged()
                        Log.i("success", response.body().toString())
                    } else {
                        Toast.makeText(this@EventActivity, "No events found", Toast.LENGTH_LONG).show()
                    }
                } catch (e: Exception) {
                    Toast.makeText(this@EventActivity, "Error Occurred: ${e.message}", Toast.LENGTH_LONG).show()
                    Log.e("search Error", "Response code: ${e.message}")
                }
            }
        }

    }
}