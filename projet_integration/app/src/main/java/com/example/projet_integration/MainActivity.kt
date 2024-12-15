package com.example.projet_integration

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class MainActivity : AppCompatActivity() {

    private lateinit var email: EditText
    private lateinit var password: EditText
    private lateinit var signup: TextView
    private lateinit var signin: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        email = findViewById(R.id.useremail)
        password = findViewById(R.id.password)
        signup = findViewById(R.id.signup)
        signin = findViewById(R.id.btn_login)


        // Action pour se connecter
        signin.setOnClickListener {
            // Vérifier ici les informations d'identification de l'utilisateur (email, mot de passe)
            // Si les informations sont valides, naviguer vers l'activité des offres
            val intent = Intent(this, OffersActivity::class.java)

            startActivity(intent)
            finish() // Fermer l'activité actuelle pour éviter de revenir en arrière
        }

        // Action pour s'inscrire
        signup.setOnClickListener {
            val intent = Intent(this, SignupActivity::class.java)
            startActivity(intent)
        }

        // Gestion des fenêtres
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
    }
}
