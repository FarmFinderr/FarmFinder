package com.example.projet_integration

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.projet_integration.services.users.ApiUser
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class MainActivity : AppCompatActivity() {

    private lateinit var email: EditText
    private lateinit var password: EditText
    private lateinit var signup: TextView
    private lateinit var signin: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
        val scope = CoroutineScope(Dispatchers.Main)
        email = findViewById(R.id.useremail)
        password = findViewById(R.id.password)
        signup = findViewById(R.id.signup)
        signin = findViewById(R.id.btn_login)


        // Action pour se connecter
        signin.setOnClickListener {
            val intent = Intent(this, MainActivity2::class.java)

           startActivity(intent)
           finish()/// Fermer l'activité actuelle pour éviter de revenir en arrière

            val  client =  "admin-cli"
            val secret ="6eSQJ1P8twATPpYefbVxa0Unfod1FCBt"
            val secretsyrine="Kcs0uaQIIRW9tUJnzbW5iQlozTRdsXlo"
            var Acces_token  =  ""
            scope.launch {
                try {
                    val login_response = ApiUser.apiService.login(username = "akram@gmail.com" ,  password = "123")
                    //if(login_response.bod)
                    Log.i("valid token ",login_response.accessToken)
                    val  user =  ApiUser.apiService.getUserById("1")
                    Log.i("valid user ","${user.body()!!}")
                } catch (e: Exception) {
                    Log.e("failed","error : ${e.message}")
                }
            }

           /*val intent = Intent(this, CreateEvent::class.java)


            startActivity(intent)
            finish() */// Fermer l'activité actuelle pour éviter de revenir en arrière
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
