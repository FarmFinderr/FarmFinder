import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.projet_integration.models.Event
import com.example.projet_integration.R
import com.example.projet_integration.ParticipationActivity // Import the new activity

class EventAdapter(
    private val context: Context, // Pass the context
    private val events: List<Event>
) : RecyclerView.Adapter<EventAdapter.EventViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): EventViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_event, parent, false)
        return EventViewHolder(view)
    }

    override fun onBindViewHolder(holder: EventViewHolder, position: Int) {
        val event = events[position]

        holder.descriptionTextView.text = event.description
        holder.dateTextView.text = "Event Date: ${event.date_debut}"
        holder.priceTextView.text = "Price: $${event.price}"

        // Load the event image with Glide
        if (event.photo!!.isNotEmpty()) {
            holder.postImageView.visibility = View.VISIBLE
            Glide.with(holder.itemView.context)
                .load(event.photo)
                .placeholder(R.drawable.logo)
                .into(holder.postImageView)
        } else {
            holder.postImageView.visibility = View.GONE
        }

        // Configure the open button
        holder.openButton.text = if (event.status == true) "Open" else "Sold"
        holder.openButton.isEnabled = event.status == true

        // Set click listener for the "Participer" button
        holder.actionButton.setOnClickListener {
            val intent = Intent(context, ParticipationActivity::class.java)
            intent.putExtra("id", event.id) // Pass the event ID
            context.startActivity(intent)
        }
    }

    override fun getItemCount(): Int = events.size

    class EventViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val postImageView: ImageView = view.findViewById(R.id.postImageView)
        val descriptionTextView: TextView = view.findViewById(R.id.descriptionTextView)
        val dateTextView: TextView = view.findViewById(R.id.dateTextView)
        val priceTextView: TextView = view.findViewById(R.id.priceTextView)
        val openButton: Button = view.findViewById(R.id.openButton)
        val actionButton: Button = view.findViewById(R.id.actionButton)
    }
}
