import Image from '../models/Image.js';
import multer from 'multer';
import path from 'path';

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure the directory exists
    },
    filename: (req, file, cb) => {
        // Use the correct property: file.originalname
        const filename = Date.now() + path.extname(file.originalname); // Corrected line
        cb(null, filename);
    },
});

const upload = multer({ storage });
export const uploadImage = upload.single('file');

// Controller functions
export const createImage = async (req, res, next) => {
    try {
        if (!req.file) {
            throw new Error('Aucun fichier téléchargé');
        }

        const { postId } = req.body;
        // Use backticks for proper string interpolation
        const imagePath = `/uploads/${req.file.filename}`; // Corrected line

        console.log('Fichier téléchargé:', req.file);
        console.log('ID du post:', postId);

        const image = new Image({
            postId,
            path: imagePath,
            date: new Date(),
        });

        const savedImage = await image.save();
        res.status(201).json(savedImage);
    } catch (err) {
        console.error('Erreur dans createImage:', err);
        next(err); // Pass the error to the error handling middleware
    }
};

export const getImages = async (req, res, next) => {
    try {
        const images = await Image.find();
        res.json(images);
    } catch (err) {
        next(err);
    }
};

export const getImagesByPostId = async (req, res, next) => {
    try {
        const images = await Image.find({ postId: req.params.postId });
        res.json(images);
    } catch (err) {
        next(err);
    }
};

export const deleteImage = async (req, res, next) => {
    try {
        const deletedImage = await Image.findByIdAndDelete(req.params.id);
        res.json({ message: 'Image supprimée', deletedImage });
    } catch (err) {
        next(err);
    }
};
