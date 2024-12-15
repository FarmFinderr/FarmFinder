package com.example.projet_integration

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class CreateEvent : AppCompatActivity() {

    private lateinit var  submit  : Button
    private lateinit var  title  : EditText
    private lateinit var description  : EditText
    private lateinit  var price : EditText
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_create_event)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        submit  =  findViewById(R.id.submitButton)
        title =  findViewById(R.id.titleInput)
        description =  findViewById(R.id.descriptionTextView)

        val  titre  =  title.text
        val prix = price.text.toString().toDoubleOrNull();
        val  desc =  description.text
        val newEvent =


    }
}