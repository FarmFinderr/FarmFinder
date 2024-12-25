package com.example.projet_integration

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.auth0.jwt.JWT
import com.auth0.jwt.interfaces.DecodedJWT
import com.example.projet_integration.services.users.ApiUser
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class MainActivity : AppCompatActivity() {

    private lateinit var email: EditText
    private lateinit var password: EditText
    private lateinit var signup: TextView
    private lateinit var signin: Button
    private lateinit var Shared: SharedPreferences

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        // Initialize UI elements
        val scope = CoroutineScope(Dispatchers.Main)
        email = findViewById(R.id.useremail)
        password = findViewById(R.id.password)
        signup = findViewById(R.id.signup)
        signin = findViewById(R.id.btn_login)
        Shared = SharedPreferences(this)

        // Check if the user is already logged in
        val id = Shared.getValueString("id")
        if (id != null) {
            // If the user is already logged in, navigate to MainActivity2
            val intent = Intent(this, MainActivity2::class.java)
            startActivity(intent)
            finish()
        }

        // Handle sign-in action
        signin.setOnClickListener {
            val client = "admin-cli"
            val secret = "6eSQJ1P8twATPpYefbVxa0Unfod1FCBt"
            var accessToken = ""
            var userId = ""

            scope.launch {
                try {
                    // Perform login request
                    val loginResponse = ApiUser.apiService.login(
                        username = email.text.toString(),
                        password = password.text.toString()
                    )

                    // Extract the access token from the response
                    Log.i("valid token", loginResponse.accessToken)

                    // Decode the JWT to get user info
                    val decodedJWT: DecodedJWT = JWT.decode(loginResponse.accessToken)
                    userId = decodedJWT.getClaim("sub").asString()

                    // Fetch user details using the userId
                    val user = ApiUser.apiService.getUserById(userId)
                    if (user != null) {
                        // Save user data in SharedPreferences
                        Shared.save("id", user.body()!!.id ?:"")
                        Shared.save("email", user.body()!!.emailAdresse ?:"")
                        Shared.save("password", user.body()!!.password ?:"")
                        Shared.save("photo", user.body()!!.photo ?:"")
                        Shared.save("nom", user.body()!!.name ?:"")
                        Shared.save("lakab", user.body()!!.lastName ?:"")

                        // Navigate to MainActivity2 after successful login
                        val intent = Intent(this@MainActivity, MainActivity2::class.java)
                        startActivity(intent)
                        finish() // Close the login activity so the user cannot go back to it
                    } else {
                        // Handle the case where user data could not be fetched
                        Toast.makeText(this@MainActivity, "User not found", Toast.LENGTH_SHORT).show()
                    }

                } catch (e: Exception) {
                    // Handle errors (e.g., invalid login credentials)
                    Log.e("Login failed", "Error: ${e.message}")
                    Toast.makeText(this@MainActivity, "Login failed: ${e.message}", Toast.LENGTH_SHORT).show()
                }
            }
        }

        // Action to navigate to signup activity
        signup.setOnClickListener {
            val intent = Intent(this, SignupActivity::class.java)
            startActivity(intent)
        }

        // Handle window insets (system bars)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
    }
}
