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
    private lateinit var Shared : SharedPreferences


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
        val scope = CoroutineScope(Dispatchers.Main)
        email = findViewById(R.id.useremail)
        password = findViewById(R.id.password)
        signup = findViewById(R.id.signup)
        signin = findViewById(R.id.btn_login)
        Shared = SharedPreferences(this)





        val id =  Shared.getValueString("id")
        if(id!=null)
        {
            val intent =  Intent(this,OffersActivity::class.java)
            startActivity(intent)
            finish()
        }



        val  client =  "admin-cli"
        val secret ="6eSQJ1P8twATPpYefbVxa0Unfod1FCBt"
        var Acces_token  =  ""
        // Action pour se connecter
        signin.setOnClickListener {


            val  client =  "admin-cli"
            val secret ="6eSQJ1P8twATPpYefbVxa0Unfod1FCBt"
            var Acces_token  =  ""
            var userId=""
            scope.launch {
                try {
                    val login_response = ApiUser.apiService.login(username = email.text.toString() ,  password = password.text.toString())
                    Log.i("valid token ",login_response.accessToken)

                   val decodedJWT: DecodedJWT = JWT.decode(login_response.accessToken)
                   userId = decodedJWT.getClaim("sub").asString()
                    val  user =  ApiUser.apiService.getUserById(userId.toString())
                    if(user !=null)
                    {
                        Shared.save("id",user.body()!!.id)
                        Shared.save("email",user.body()!!.emailAdresse)
                        Shared.save("password",user.body()!!.password)
                        Shared.save("photo",user.body()!!.photo)

                    }


                } catch (e: Exception) {
                    //Toast.makeText(this@MainActivity, "Error while trying to Login", Toast.LENGTH_SHORT).show()
                    Log.e("failed","error : ${e.message}")
                }
            }






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
