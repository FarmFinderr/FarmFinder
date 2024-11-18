package com.example.projet_integration


import PostAdapter
import android.os.Bundle
import androidx.appcompat.widget.Toolbar
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView


class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)



        val recyclerView: RecyclerView = findViewById(R.id.recyclerView)
        recyclerView.layoutManager = LinearLayoutManager(this)

        // Dummy data to populate the list
        val posts = listOf(
            Post(
                name = "Iheb Sessi",
                date = "27 Février à 19:31",
                content = "3 ha a vendre à 5 km de Bizerte a 10 min seulemnet de Bizerte centre en plein compagne endroit ideal et calme . a birine bouhamed . avec titre bleu individuel.",
                likes = 10,
                localImageResId =null
            ),
            Post(
                name = "Iheb Sessi",
                date = "27 Février à 20:01",
                content = "3 ha a vendre à 14 km de tunis centre...",
                likes = 15,
                localImageResId = R.drawable.terrain2
            ),
            Post(
                name = "Iheb Sessi ",
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
