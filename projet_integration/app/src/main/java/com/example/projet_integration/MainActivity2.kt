package com.example.projet_integration

import PostAdapter
import android.app.Dialog
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.GravityCompat
import androidx.drawerlayout.widget.DrawerLayout
import androidx.fragment.app.DialogFragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.projet_integration.models.Reclamation
import com.example.projet_integration.services.post.ApiPost
import com.example.projet_integration.services.reclamation.ApiReclamation
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
    private lateinit var Shared: SharedPreferences
    private lateinit var imageview: ImageView
    private lateinit var neuf: TextView
    private lateinit var header: TextView
    private var prenom: String? = null
    private var nom: String? = null
    private var userid: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Initialize views
        neuf = findViewById(R.id.quoi_de_neuf_text)
        imageview = findViewById(R.id.profile_image)
        recyclerView = findViewById(R.id.recyclerView)
        drawerLayout = findViewById(R.id.drawerLayout)
        val navigation: NavigationView = findViewById(R.id.navigation)
        Shared = SharedPreferences(this)
        prenom = Shared.getValueString("nom")
        nom = Shared.getValueString("lakab")
        userid = Shared.getValueString("id")

        // Set up ActionBarDrawerToggle
        toggle = ActionBarDrawerToggle(this, drawerLayout, R.string.open_drawer, R.string.close_drawer)
        drawerLayout.addDrawerListener(toggle)
        toggle.syncState()

        neuf.hint = "Quoi de neuf, ${prenom} ${nom} ?"
        Toast.makeText(this@MainActivity2, "Welcome: ${prenom}", Toast.LENGTH_LONG).show()

        /*Glide.with(this)
            .load(Shared.getValueString("photo"))  // Assuming 'post.user.photo' is the URL of the image
            .into(imageview)*/

        // Open drawer on menu icon click
        val menuIcon: ImageView = findViewById(R.id.menu)
        menuIcon.setOnClickListener {
            drawerLayout.openDrawer(GravityCompat.START)
        }

        // Handle navigation menu clicks
        navigation.setNavigationItemSelectedListener { menuItem ->
            when (menuItem.itemId) {
                R.id.Events -> {
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
                R.id.Posts -> {
                    val intent = Intent(this, OffersActivity::class.java)
                    startActivity(intent)
                    drawerLayout.closeDrawer(GravityCompat.START)
                    true
                }
                R.id.createEvent -> {
                    val intent = Intent(this, CreateEvent::class.java)
                    startActivity(intent)
                    drawerLayout.closeDrawer(GravityCompat.START)
                    true
                }
                R.id.reclamation -> {
                    // Show the CustomDialogFragment for Reclamation, passing data
                    val reclamationDialog = CustomDialogFragment().apply {
                        arguments = Bundle().apply {
                            putString("userId", userid)
                            putString("name", prenom)
                            putString("lastName", nom)
                        }
                    }
                    reclamationDialog.show(supportFragmentManager, "ReclamationDialog")
                    drawerLayout.closeDrawer(GravityCompat.START)
                    true
                }
                else -> false
            }
        }

        // Initialize RecyclerView
        recyclerView.layoutManager = LinearLayoutManager(this)
        postsList = ArrayList()
        postAdapter = PostAdapter(postsList, this)
        recyclerView.adapter = postAdapter

        // Fetch posts from the API
        fetchPosts()
    }

    private fun fetchPosts() {
        val scope = CoroutineScope(Dispatchers.Main)
        scope.launch {
            try {
                val response = ApiPost.apiService.getPosts()
                if (response.isSuccessful && response.body() != null) {
                    postsList.clear()
                    postsList.addAll(response.body()!!)
                    postAdapter.notifyDataSetChanged()
                    Toast.makeText(this@MainActivity2, "success: ${response.body().toString()!!}", Toast.LENGTH_LONG).show()
                    Log.i("success", "Posts retrieved successfully: ${response.body()!!}")
                } else {
                    Log.e("API Error", "Unsuccessful response: ${response.code()} - ${response.message()}")
                    Toast.makeText(this@MainActivity2, "Failed to load posts: ${response.message()}", Toast.LENGTH_LONG).show()
                }
            } catch (e: Exception) {
                Log.e("Error", "Error while fetching posts: ${e.message}")
                Toast.makeText(this@MainActivity2, "Error: ${e.message}", Toast.LENGTH_LONG).show()
            }
        }
    }

    class CustomDialogFragment : DialogFragment() {
        override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
            // Retrieve the arguments passed to the fragment
            val userId = arguments?.getString("userId") ?: ""
            val name = arguments?.getString("name") ?: ""
            val lastName = arguments?.getString("lastName") ?: ""

            val dialog = Dialog(requireActivity())
            val view = LayoutInflater.from(requireContext()).inflate(R.layout.dialogfragment, null)

            // Initialize dialog elements
            val dialogIcon: ImageView = view.findViewById(R.id.dialog_icon)
            val dialogTitle: TextView = view.findViewById(R.id.dialog_title)
            val dialogMessage: TextView = view.findViewById(R.id.dialog_message_input)
            val okButton: Button = view.findViewById(R.id.dialog_ok)
            val cancelButton: Button = view.findViewById(R.id.dialog_cancel)

            // Handle button clicks
            okButton.setOnClickListener {
                val reclamationMessage = dialogMessage.text.toString()

                // Make the API call to create the reclamation
                val scope = CoroutineScope(Dispatchers.Main)
                scope.launch {
                    try {
                        val response = ApiReclamation.apiService.createReclamation(Reclamation(userId, reclamationMessage, name, lastName))
                        if (response.isSuccessful) {
                            Toast.makeText(requireContext(), "Reclamation created successfully", Toast.LENGTH_SHORT).show()
                        } else {
                            Toast.makeText(requireContext(), "Failed to create reclamation", Toast.LENGTH_SHORT).show()
                        }
                    } catch (e: Exception) {
                        Log.e("Reclamation Error", "Error while creating reclamation: ${e.message}", e)
                        Toast.makeText(requireContext(), "Error: ${e.message}", Toast.LENGTH_SHORT).show()
                    } finally {
                        dismiss()  // Dismiss the dialog after the request is finished
                    }
                }
            }


            cancelButton.setOnClickListener {
                dismiss()  // Close the dialog
            }

            dialog.setContentView(view)
            dialog.setCancelable(true)

            return dialog
        }
    }
}
