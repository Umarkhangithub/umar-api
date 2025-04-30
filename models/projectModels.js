import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  techStack: [String],
  githubLink: String,
  liveDemo: String,
  image: String, // image URL from Cloudinary or local
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;
