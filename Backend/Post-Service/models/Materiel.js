import Post from './Post.js';
import mongoose from 'mongoose';


const materielSchema = new mongoose.Schema({
    etat: { type: String , required: true},
    defaut: { type: String, required: true }
});

const Materiel = Post.discriminator('materiel', materielSchema);

export default Materiel;
