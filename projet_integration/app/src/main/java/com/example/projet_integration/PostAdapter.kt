import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.projet_integration.OffreAdapter.OffreViewHolder
import com.example.projet_integration.Post
import com.example.projet_integration.R

class PostAdapter(private val posts: List<Post>, private val context: Context) :
    RecyclerView.Adapter<PostAdapter.PostViewHolder>() {

    inner class PostViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val nameTextView: TextView = view.findViewById(R.id.nameTextView)
        val dateTextView: TextView = view.findViewById(R.id.dateTextView)
        val contentTextView: TextView = view.findViewById(R.id.contentTextView)
        val postImageView: ImageView = view.findViewById(R.id.postImageView)
        val likesTextView: TextView = view.findViewById(R.id.likesTextView)
        val profileImageView: ImageView = view.findViewById(R.id.profile_image)
        val locationTextView:TextView = view.findViewById(R.id.locationTextView)
        val airTextView: TextView = view.findViewById(R.id.airTextView) // Surface
        val typeTextView: TextView = view.findViewById(R.id.typeTextView) // Type
        val priceTextView: TextView = view.findViewById(R.id.priceTextView)

        fun bind(post: Post) {
            // Binding user name, date, and content
            // You may need to adjust this based on your model
            dateTextView.text = post.date.toString() // Adjust date format as needed
            contentTextView.text = post.description

            locationTextView.text=post.localisation

            airTextView.text = "Surface \uD83D\uDDFA\uFE0F: ${post.air} ha"
            typeTextView.text = "Type \uD83C\uDFE1 : ${post.type}" // Exemple : "Résidentiel"
            priceTextView.text = "Prix \uD83D\uDCB0 : ${post.price} TND"

            // Load the profile image
           /* Glide.with(context)
                .load(post.profileImageUrl) // Assuming 'profileImageUrl' is in your Post model
                .into(profileImageView)*/

            // Load post image using Glide
            if (post.images.isNotEmpty()) {
                val imagePath = post.images[0].path // Get first image's path
                val imageUrl = "http://10.0.2.2:5000" + imagePath // For emulator

                Glide.with(context)
                    .load(imageUrl)
                    .into(postImageView)
            } else {
                postImageView.setImageResource(R.drawable.terrain2) // Default image
            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PostViewHolder {
        val view = LayoutInflater.from(context).inflate(R.layout.item_post, parent, false)
        return PostViewHolder(view)
    }

    override fun onBindViewHolder(holder: PostViewHolder, position: Int) {
        val post = posts[position]
        holder.bind(post)
    }

    override fun getItemCount(): Int = posts.size
}




