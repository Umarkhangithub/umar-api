import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    public_id: String,
    url: String,
  },
  resume: {
    public_id: String,
    url: String,
  },
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
    instagram: String,
    youtube: String,
  },
}, { timestamps: true });

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
