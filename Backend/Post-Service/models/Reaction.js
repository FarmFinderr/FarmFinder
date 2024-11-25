import mongoose from 'mongoose';

const reactionSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
<<<<<<< HEAD
    userId: { type: String, required: true },
=======
    userId: { type: Number, required: true },
>>>>>>> master
    reactionType: { 
        type: String, 
        enum: ['like', 'love', 'haha', 'wow', 'sad', 'angry'], 
        required: true 
    },
<<<<<<< HEAD
    date: { type: Date, default: Date.now }
});

const Reaction = mongoose.model('Reaction', reactionSchema);

export default Reaction;
=======
    date: { 
        type: Date, 
        default: Date.now 
    }});

const Reaction = mongoose.model('Reaction', reactionSchema);

export default Reaction;
>>>>>>> master
