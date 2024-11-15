import Post from './Post.js';
import mongoose from 'mongoose';

const terrainSchema = new mongoose.Schema({
    air: { type: Number, required: true },
    localisation: { type: String, required: true },
});

const Terrain = Post.discriminator('terrain', terrainSchema);

export default Terrain;
