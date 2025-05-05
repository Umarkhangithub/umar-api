import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [3, 'Title must be at least 3 characters'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [10, 'Description must be at least 10 characters'],
    trim: true,
  },
  techStack: {
    type: [String],
    validate: {
      validator: (arr) => arr.length > 0,
      message: 'Tech stack must include at least one technology',
    },
  },
  githubLink: {
    type: String,
    validate: {
      validator: (v) => /^https?:\/\/.+/.test(v),
      message: 'GitHub link must be a valid URL',
    },
  },
  liveDemo: {
    type: String,
    validate: {
      validator: (v) => !v || /^https?:\/\/.+/.test(v),
      message: 'Live demo must be a valid URL (if provided)',
    },
  },
  image: String,
}, { timestamps: true });


const Project = mongoose.model('Project', projectSchema);
export default Project;
