import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.projet_integration.Post
import com.example.projet_integration.R

class PostAdapter(private val posts: List<Post>) : RecyclerView.Adapter<PostAdapter.PostViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PostViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_post, parent, false)
        return PostViewHolder(view)
    }

    override fun onBindViewHolder(holder: PostViewHolder, position: Int) {
        val post = posts[position]

        holder.nameTextView.text = post.name
        holder.dateTextView.text = post.date
        holder.contentTextView.text = post.content
        holder.likesTextView.text = post.likes.toString()

        // Charger l'image avec Glide
        if (post.localImageResId != null) {
            // Si une ressource locale est définie, charge l'image locale
            holder.postImageView.visibility = View.VISIBLE
            holder.postImageView.setImageResource(post.localImageResId)
        } else if (post.imageUrl != null) {
            // Si une URL est définie, charge l'image avec Glide
            holder.postImageView.visibility = View.VISIBLE
            Glide.with(holder.itemView.context)
                .load(post.imageUrl)
                .into(holder.postImageView)
        } else {
            // Cache l'ImageView si aucune image n'est fournie
            holder.postImageView.visibility = View.GONE
        }
    }

    override fun getItemCount(): Int = posts.size

    class PostViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val nameTextView: TextView = view.findViewById(R.id.nameTextView)
        val dateTextView: TextView = view.findViewById(R.id.dateTextView)
        val contentTextView: TextView = view.findViewById(R.id.contentTextView)
        val postImageView: ImageView = view.findViewById(R.id.postImageView)
        val likesTextView: TextView = view.findViewById(R.id.likesTextView)
    }
}
