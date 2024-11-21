    package com.example.projet_integration


    import PostAdapter
    import android.content.Intent
    import android.os.Bundle
    import android.widget.ImageView
    import androidx.appcompat.app.ActionBarDrawerToggle
    import androidx.appcompat.widget.Toolbar
    import androidx.appcompat.app.AppCompatActivity
    import androidx.core.view.GravityCompat
    import androidx.drawerlayout.widget.DrawerLayout
    import androidx.recyclerview.widget.LinearLayoutManager
    import androidx.recyclerview.widget.RecyclerView
    import com.google.android.material.navigation.NavigationView


    class MainActivity : AppCompatActivity() {


        lateinit var drawerLayout : DrawerLayout
        private lateinit var toggle : ActionBarDrawerToggle

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(R.layout.activity_main)

            drawerLayout = findViewById(R.id.drawerLayout)
            val navigation: NavigationView = findViewById(R.id.navigation)
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
                    else -> false
                }
            }


            val recyclerView: RecyclerView = findViewById(R.id.recyclerView)
            recyclerView.layoutManager = LinearLayoutManager(this)

            val posts = listOf(
                Post(
                    name = "Iheb Sessi",
                    date = "27 Février à 19:31",
                    content = "3 ha a vendre à 5 km de Bizerte...",
                    likes = 10,
                    localImageResId = null
                ),
                Post(
                    name = "Iheb Sessi",
                    date = "27 Février à 20:01",
                    content = "3 ha a vendre à 14 km de tunis centre...",
                    likes = 15,
                    localImageResId = R.drawable.terrain2
                ),
                Post(
                    name = "Iheb Sessi",
                    date = "27 Février à 20:05",
                    content = "à vendre belle ferme de 17 ha avec titre...",
                    likes = 20,
                    localImageResId = R.drawable.terrain
                )
            )

            val adapter = PostAdapter(posts)
            recyclerView.adapter = adapter
        }
    }
