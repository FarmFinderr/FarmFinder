package com.example.projet_integration


import PostAdapter
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.GravityCompat
import androidx.drawerlayout.widget.DrawerLayout
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.projet_integration.services.post.ApiPost
import com.google.android.material.navigation.NavigationView
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class MainActivity2 : AppCompatActivity() {

    lateinit var drawerLayout: DrawerLayout
    private lateinit var toggle: ActionBarDrawerToggle
    private lateinit var recyclerView: RecyclerView
    private lateinit var postAdapter: PostAdapter
    private lateinit var postsList: ArrayList<Post> // List to hold posts
    private lateinit var Shared : SharedPreferences


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Initialize views
        recyclerView = findViewById(R.id.recyclerView)
        drawerLayout = findViewById(R.id.drawerLayout)
        val navigation: NavigationView = findViewById(R.id.navigation)
        Shared = SharedPreferences(this)

        // Set up ActionBarDrawerToggle
        toggle = ActionBarDrawerToggle(this, drawerLayout, R.string.open_drawer, R.string.close_drawer)
        drawerLayout.addDrawerListener(toggle)
        toggle.syncState()

        // Open drawer on menu icon click
        val menuIcon: ImageView = findViewById(R.id.menu)
            menuIcon.setOnClickListener {
                drawerLayout.openDrawer(GravityCompat.START)
            }

            // Handle navigation menu clicks
        navigation.setNavigationItemSelectedListener { menuItem ->
            when (menuItem.itemId) {
                R.id.Events -> {
                    // Navigate to EventActivity
                    val intent = Intent(this, EventActivity::class.java)
                    startActivity(intent)
                    drawerLayout.closeDrawer(GravityCompat.START)
                    true
                }
                R.id.logout -> {
                    // Handle logout logic
                    Shared.removeValue("id")
                    val intent = Intent(this, MainActivity::class.java)  // Redirect to MainActivity after logout
                    startActivity(intent)
                    drawerLayout.closeDrawer(GravityCompat.START)
                    true
                }
                else -> false
            }
        }

        // Initialize RecyclerView
        recyclerView.layoutManager = LinearLayoutManager(this)
        postsList = ArrayList()  // Initialize posts list

        // Initialize the PostAdapter with an empty list initially
        postAdapter = PostAdapter(postsList, this)
        recyclerView.adapter = postAdapter

        // Fetch posts from the API
        fetchPosts()
    }

    private fun fetchPosts() {
        val scope = CoroutineScope(Dispatchers.Main)
        scope.launch {
            try {
                // Make the API call asynchronously
                val response = ApiPost.apiService.getPosts() // Assuming this method exists in your ApiService
                if (response.isSuccessful && response.body() != null) {
                    postsList.clear()
                    postsList.addAll(response.body()!!) // Populate the posts list
                    postAdapter.notifyDataSetChanged() // Notify the adapter about the data change
                    Toast.makeText(this@MainActivity2, "success: ${response.body().toString()!!}", Toast.LENGTH_LONG).show()
                    Log.i("success", "Posts retrieved successfully: ${response.body()!!}")
                } else {
                    // Handle unsuccessful response (non-200 status codes)
                    Log.e("API Error", "Unsuccessful response: ${response.code()} - ${response.message()}")
                    Toast.makeText(this@MainActivity2, "Failed to load posts: ${response.message()}", Toast.LENGTH_LONG).show()
                    //result.text = response.message()!!.toString()
                }
            } catch (e: Exception) {
                // Catching any other exceptions, e.g., network issues or JSON parsing issues
                Log.e("Error", "Error while fetching posts: ${e.message}")
                Toast.makeText(this@MainActivity2, "Error: ${e.message}", Toast.LENGTH_LONG).show()
            }
        }
    }

}
