const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/workoutsDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Define the workout schema with the updated videos field
const workoutSchema = new mongoose.Schema({
  id: { type: Number, required: true },  // Unique workout ID
  name: { type: String, required: true },  // Workout name
  aliases: { type: [String], default: [] },  // Alternative names for the workout
  uuid: { type: String },  // Unique UUID for the workout
  exercise_base_id: { type: Number },  // Base ID for exercise
  description: { type: String },  // HTML description of the workout
  created: { type: Date, default: Date.now },  // Date when the workout was created
  category: {
    id: { type: Number },
    name: { type: String }
  },  // Category of the workout (e.g., Arms)
  muscles: [
    {
      id: { type: Number },
      name: { type: String },
      name_en: { type: String },
      is_front: { type: Boolean },
      image_url_main: { type: String },  // Main muscle image URL
      image_url_secondary: { type: String }  // Secondary muscle image URL
    }
  ],  // Array of muscles used in the workout
  muscles_secondary: [
    {
      id: { type: Number },
      name: { type: String }
    }
  ],  // Secondary muscles used in the workout
  equipment: [
    {
      id: { type: Number },
      name: { type: String }
    }
  ],  // Equipment needed for the workout
  language: {
    id: { type: Number },
    short_name: { type: String },
    full_name: { type: String },
    full_name_en: { type: String }
  },  // Language details
  license: {
    id: { type: Number },
    full_name: { type: String },
    short_name: { type: String },
    url: { type: String }
  },  // License information for the workout
  license_author: { type: String },  // Author of the license
  images: [
    {
      id: { type: Number },
      uuid: { type: String },
      exercise_base: { type: Number },
      exercise_base_uuid: { type: String },
      image: { type: String },  // Image URL
      is_main: { type: Boolean },  // Whether this is the main image
      style: { type: String },
      license: { type: Number },
      license_title: { type: String },
      license_object_url: { type: String },
      license_author: { type: String },
      license_author_url: { type: String },
      license_derivative_source_url: { type: String },
      author_history: { type: [String], default: [] }  // History of authors contributing to the workout
    }
  ],  // Array of images related to the workout
  videos: [
    {
      id: { type: Number },
      uuid: { type: String },
      exercise_base: { type: Number },
      exercise_base_uuid: { type: String },
      video: { type: String },  // URL of the video
      is_main: { type: Boolean },
      size: { type: Number },  // Size of the video file in bytes
      duration: { type: String },  // Duration of the video
      width: { type: Number },  // Width of the video in pixels
      height: { type: Number },  // Height of the video in pixels
      codec: { type: String },  // Codec used for the video
      codec_long: { type: String },  // Long form of codec description
      license: { type: Number },
      license_title: { type: String },
      license_object_url: { type: String },
      license_author: { type: String },
      license_author_url: { type: String },
      license_derivative_source_url: { type: String },
      author_history: { type: [String], default: [] }  // History of authors contributing to the video
    }
  ],  // Array of videos related to the workout
  comments: { type: [String], default: [] },  // Array of comments (if applicable)
  variations: { type: [Number], default: [] },  // Array of variations of the workout
  author_history: { type: [String], default: [] }  // History of authors
});

// Create the workout model
const Workout = mongoose.model('Workout', workoutSchema);

// API route to get all workouts
app.get('/api/workouts', async (req, res) => {
  try {
    // Fetch all workouts from the database
    const workouts = await Workout.find();
    console.log('Workouts fetched successfully:', workouts);  // Log for debugging
    res.json(workouts);  // Return the workouts as JSON
  } catch (err) {
    console.error('Error fetching workouts:', err);  // Log the error for debugging
    res.status(500).json({ error: 'Failed to fetch workouts' });  // Return error response
  }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
