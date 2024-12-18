package com.example.projet_integration


import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.projet_integration.R
import com.example.projet_integration.models.Participation

class ParticipationAdapter(private val participationList: List<Participation>) :
    RecyclerView.Adapter<ParticipationAdapter.ParticipationViewHolder>() {

    // ViewHolder to hold the views for each item
    inner class ParticipationViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val userImageView: ImageView = itemView.findViewById(R.id.userImageView)
        val userNameTextView: TextView = itemView.findViewById(R.id.userNameTextView)
        val userEmailTextView: TextView = itemView.findViewById(R.id.userEmailTextView)
        val userPhoneTextView: TextView = itemView.findViewById(R.id.userPhoneTextView)
    }

    // Inflate the layout for each item
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ParticipationViewHolder {
        val itemView = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_user, parent, false)
        return ParticipationViewHolder(itemView)
    }

    // Bind data to each item
    override fun onBindViewHolder(holder: ParticipationViewHolder, position: Int) {
        val participation = participationList[position]
        val user = participation.user

        // Set user data if user is not null
        user?.let {
            holder.userNameTextView.text = "${it.name} ${it.lastName}"
            holder.userEmailTextView.text = it.emailAdresse
            holder.userPhoneTextView.text = it.phoneNumber

            // Load user photo using Glide
            Glide.with(holder.itemView.context)
                .load(it.photo)
                .placeholder(R.drawable.profile)
                .into(holder.userImageView)
        }
    }

    // Return the total number of items
    override fun getItemCount(): Int {
        return participationList.size
    }
}

