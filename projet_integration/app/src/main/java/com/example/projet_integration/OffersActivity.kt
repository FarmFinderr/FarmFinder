package com.example.projet_integration

import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.Spinner
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.projet_integration.services.post.ApiPost
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class OffersActivity : AppCompatActivity() {

    // Déclaration des variables
    private lateinit var recyclerView: RecyclerView
    private lateinit var offerAdapter: OffreAdapter
    private lateinit var offersList: ArrayList<Post>
    private lateinit var filteredList: ArrayList<Post>

    // Champs pour la recherche
    private lateinit var searchPriceEditText: EditText
    private lateinit var regionSpinner: Spinner
    private lateinit var searchButton: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.offres_page)

        // Initialisation des vues
        recyclerView = findViewById(R.id.recycler_view_offers)
        searchPriceEditText = findViewById(R.id.search_bar)
        regionSpinner = findViewById(R.id.spinner_regions)
        searchButton = findViewById(R.id.btn_search)

        // Configuration de la RecyclerView
        recyclerView.layoutManager = LinearLayoutManager(this)
        offersList = ArrayList()
        filteredList = ArrayList()
        offerAdapter = OffreAdapter(filteredList, this)
        recyclerView.adapter = offerAdapter

        // Charger les offres via l'API
        val scope = CoroutineScope(Dispatchers.Main)
        scope.launch {
            try {
                val response = ApiPost.apiService.getPosts()
                if (response.isSuccessful && response.body() != null) {
                    offersList.clear()
                    offersList.addAll(response.body()!!)
                    updateFilteredList() // Afficher toutes les offres

                    Log.i("success", "Données récupérées : ${response.body()!!}")
                }
            } catch (e: Exception) {
                Log.e("error", "Erreur lors de la récupération des données : ${e.message}")
            }
        }

        // Action du bouton de recherche pour appliquer les filtres
        searchButton.setOnClickListener {
            applyFilters()
        }
    }

    // Méthode pour appliquer les filtres de prix et de région
    private fun applyFilters() {
        val searchPrice = searchPriceEditText.text.toString().trim()
        val selectedRegion = regionSpinner.selectedItem.toString().trim()

        Log.d("Filtrage", "Prix saisi : $searchPrice, Région sélectionnée : $selectedRegion")

        filteredList.clear()

        for (offer in offersList) {
            val priceMatches = if (searchPrice.isEmpty()) {
                true
            } else {
                try {
                    val price = offer.price?.toDouble() ?: 0.0
                    val priceRange = searchPrice.toDoubleOrNull()
                    priceRange != null && Math.abs(price - priceRange) < 5.0
                } catch (e: NumberFormatException) {
                    false
                }
            }

            val regionMatches = selectedRegion.isEmpty() || offer.localisation.equals(selectedRegion, ignoreCase = true)

            if (priceMatches && regionMatches) {
                filteredList.add(offer)
            }
        }

        // Mettre à jour la RecyclerView
        offerAdapter.notifyDataSetChanged()
    }

    // Mettre à jour la liste complète sans filtre
    private fun updateFilteredList() {
        filteredList.clear()
        filteredList.addAll(offersList)
        offerAdapter.notifyDataSetChanged()
    }
}
