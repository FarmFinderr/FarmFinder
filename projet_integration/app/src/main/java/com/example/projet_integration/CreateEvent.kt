package com.example.projet_integration

import android.app.Activity
import android.app.DatePickerDialog
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import android.util.Base64
import android.util.Log
import android.widget.*
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import com.example.projet_integration.models.Event
import com.example.projet_integration.models.User
import com.example.projet_integration.services.events.ApiEvents
import com.example.projet_integration.services.users.ApiUser
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.io.ByteArrayOutputStream
import java.io.InputStream
import java.text.SimpleDateFormat
import java.util.*
import kotlin.collections.ArrayList

class CreateEvent : AppCompatActivity() {

    private lateinit var submit: Button
    private lateinit var title: EditText
    private lateinit var description: EditText
    private lateinit var price: EditText
    private lateinit var date_d: Button
    private lateinit var date_f: Button
    private lateinit var uploadButton: Button
    private lateinit var previewImage: ImageView
    private var selectedImageUri: Uri? = null
    private var base64Image: String? = null
    private var date_debut: Date? = null
    private var date_fin: Date? = null
    private lateinit var owner: User

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_create_event)
        val scope = CoroutineScope(Dispatchers.Main)
        // Initialize UI components
        submit = findViewById(R.id.submitButton)
        title = findViewById(R.id.titleInput)
        description = findViewById(R.id.description)
        price = findViewById(R.id.priceInput)
        date_d = findViewById(R.id.date_debut)
        date_f = findViewById(R.id.date_fin)
        uploadButton = findViewById(R.id.selectPhotoButton)
        previewImage = findViewById(R.id.previewImage)

        // Fetch owner data
        CoroutineScope(Dispatchers.Main).launch {
            try {
                val response = ApiUser.apiService.getUserById("1")
                owner = response.body()!!
            } catch (e: Exception) {
                Toast.makeText(this@CreateEvent, "Error Occurred: ${e.message}", Toast.LENGTH_LONG).show()
            }
        }

        // Set up date pickers
        setupDatePicker(date_d) { date ->
            date_debut = date
            date_d.text = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault()).format(date!!)
        }

        setupDatePicker(date_f) { date ->
            date_fin = date
            date_f.text = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault()).format(date!!)
        }

        // Image picker
        uploadButton.setOnClickListener {
            openImagePicker()
        }

        // Submit event
        submit.setOnClickListener {
            if (validateInputs()) {
                var users  =  ArrayList<User>()
                val event = Event(
                    title = title.text.toString(),
                    date_debut = date_debut,
                    date_fin = date_fin,
                    price = price.text.toString().toDoubleOrNull(),
                    photo = base64Image,
                    owner = owner,
                    owner_id = "1",
                    description = description.text.toString(),
                    status = false,
                    users =users
                )
                scope.launch{
                    try{
                        val response =  ApiEvents.apiService.createEvent(event);
                        if(response.body()!! != null)
                        {
                            Log.i("CreateEvent", "Event created: $event")
                        
                        }
                    }
                    catch (e : Exception)
                    {
                        Log.e("error", "error ${e.message}")
                    }
                }


            }
        }
    }

    private fun setupDatePicker(button: Button, callback: (Date?) -> Unit) {
        button.setOnClickListener {
            val calendar = Calendar.getInstance()
            DatePickerDialog(
                this,
                { _, year, month, day ->
                    val selectedDate = Calendar.getInstance()
                    selectedDate.set(year, month, day)
                    callback(selectedDate.time)
                },
                calendar.get(Calendar.YEAR),
                calendar.get(Calendar.MONTH),
                calendar.get(Calendar.DAY_OF_MONTH)
            ).show()
        }
    }

    private fun validateInputs(): Boolean {
        val titre = title.text.toString()
        val desc = description.text.toString()
        val prix = price.text.toString().toDoubleOrNull()

        if (titre.isEmpty() || desc.isEmpty()) {
            Toast.makeText(this, "Title and description are required.", Toast.LENGTH_SHORT).show()
            return false
        }

        if (date_debut == null || date_fin == null) {
            Toast.makeText(this, "Please select start and end dates.", Toast.LENGTH_SHORT).show()
            return false
        }

        if (prix == null) {
            Toast.makeText(this, "Please enter a valid price.", Toast.LENGTH_SHORT).show()
            return false
        }

        if (base64Image == null) {
            Toast.makeText(this, "Please upload an image.", Toast.LENGTH_SHORT).show()
            return false
        }

        if (owner == null) {
            Toast.makeText(this, "Owner information is not available.", Toast.LENGTH_SHORT).show()
            return false
        }

        return true
    }

    private fun openImagePicker() {
        val intent = Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI)
        imagePickerLauncher.launch(intent)
    }

    private val imagePickerLauncher = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        if (result.resultCode == Activity.RESULT_OK) {
            selectedImageUri = result.data?.data
            selectedImageUri?.let {
                previewImage.setImageURI(it)
                base64Image = convertImageToBase64(it)
            }
        }
    }

    private fun convertImageToBase64(imageUri: Uri): String? {
        return try {
            val inputStream: InputStream? = contentResolver.openInputStream(imageUri)
            val bitmap = BitmapFactory.decodeStream(inputStream)
            inputStream?.close()
            val byteArrayOutputStream = ByteArrayOutputStream()
            bitmap.compress(Bitmap.CompressFormat.JPEG, 100, byteArrayOutputStream)
            val imageBytes = byteArrayOutputStream.toByteArray()
            Base64.encodeToString(imageBytes, Base64.DEFAULT)
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }
}
