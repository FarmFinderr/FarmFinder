package com.example.projet_integration

import android.app.Dialog
import android.content.Context
import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import androidx.cardview.widget.CardView
import com.bumptech.glide.Glide

class OffreAdapter(private val offers: ArrayList<Post>, private val context: Context) :
    RecyclerView.Adapter<OffreAdapter.OffreViewHolder>() {

    inner class OffreViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val imageView: ImageView = itemView.findViewById(R.id.img_offer)
        val titleTextView: TextView = itemView.findViewById(R.id.tv_offer_title)
        val detailsTextView: TextView = itemView.findViewById(R.id.tv_offer_details)
        val priceTextView: TextView = itemView.findViewById(R.id.tv_offer_price)
        val viewDetailsButton: Button = itemView.findViewById(R.id.btn_view_details)

        fun bind(offer: Post) {
            titleTextView.text = offer.localisation
            detailsTextView.text = "Air : ${offer.air} m²"
            priceTextView.text = "Prix: ${offer.price} TND"

            if (offer.images.isNotEmpty()) {
                val imagePath = offer.images[0].path // Récupérer le chemin de la première image
                val imageUrl = "http://10.0.2.2:5000" + imagePath // Remplacer localhost par 10.0.2.2 pour l'émulateur

                // Si vous êtes sur un appareil physique, utilisez l'adresse IP de votre machine :
                // val imageUrl = "http://192.168.x.x:5000" + imagePath

                Glide.with(context)
                    .load(imageUrl) // Charger l'image depuis l'URL
                    // Image par défaut pendant le chargement
                    .into(imageView)
            } else {
                // Si aucune image n'est disponible, utiliser l'image par défaut
                imageView.setImageResource(R.drawable.terrain2)
            }

            viewDetailsButton.setOnClickListener {
                showDetailsDialog(offer)
            }
        }

        // Méthode pour afficher le dialogue
        private fun showDetailsDialog(offer: Post) {
            val dialog = Dialog(context)
            dialog.setContentView(R.layout.dialog_post_details)
            dialog.window?.setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))

            val title = dialog.findViewById<TextView>(R.id.dialog_title)
            val price = dialog.findViewById<TextView>(R.id.dialog_price)
            val description = dialog.findViewById<TextView>(R.id.dialog_description)
            val type = dialog.findViewById<TextView>(R.id.dialog_type)
            val area = dialog.findViewById<TextView>(R.id.dialog_area)
            val location = dialog.findViewById<TextView>(R.id.dialog_location)
            val closeButton = dialog.findViewById<Button>(R.id.dialog_close)

            // Remplir les données
            title.text = "Détails du Post"
            price.text = "Prix: ${offer.price} TND"
            description.text = "Description: ${offer.description}"
            type.text = "Type: ${offer.type}"
            area.text = "Surface: ${offer.air} m²"
            location.text = "Localisation: ${offer.localisation}"

            closeButton.setOnClickListener {
                dialog.dismiss()
            }

            dialog.show()
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): OffreViewHolder {
        val itemView = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_offer, parent, false)
        return OffreViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: OffreViewHolder, position: Int) {
        val offer = offers[position]
        holder.bind(offer)
    }

    override fun getItemCount(): Int = offers.size
}
