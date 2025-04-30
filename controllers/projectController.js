import Project from '../models/projectModels.js';
import cloudinary from '../utils/cloudinary.js';
import { deleteImage } from '../utils/deleteImage.js';

// Create Project
export const createProject = async (req, res) => {
  try {
    const { title, description, techStack, liveUrl, githubUrl } = req.body;

    let imageUrl = null;

    if (req.file) {
      const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      const result = await cloudinary.uploader.upload(base64Image, {
        folder: 'Images',
        resource_type: 'auto',
        transformation: [
          { width: 800, height: 600, crop: 'limit' },
          { quality: 'auto' },
        ],
      });

      imageUrl = result.secure_url;
    }

    const project = new Project({
      title,
      description,
      techStack,
      liveUrl,
      githubUrl,
      image: imageUrl,
    });

    await project.save();
    res.status(201).json({ message: 'Project created successfully', project });
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).json({ message: 'Failed to create project', error: err.message });
  }
};

// Get All Projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch projects', error: err.message });
  }
};

// Get Single Project
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch project', error: err.message });
  }
};

// Update Project
export const updateProject = async (req, res) => {
  try {
    const updates = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    // Handle new image upload and delete old image
    if (req.file) {
      // Delete old image
      if (project.image) {
        const publicId = project.image.split('/').pop().split('.')[0];
        deleteImage(publicId);
      }
      // Upload new image
      const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      const result = await cloudinary.uploader.upload(base64Image, {
        folder: "Images",
        transformation: [
          { width: 800, height: 600, crop: "limit" },
          { quality: "auto" },
        ],
      });

      updates.image = result.secure_url;
    }

    const updated = await Project.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.status(200).json({ message: 'Project updated', project: updated });

  } catch (err) {
    res.status(500).json({ message: 'Failed to update project', error: err.message });
  }
};

// Delete Project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    // Delete image from Cloudinary
    if (project.image) {
      const publicId = project.image.split('/').pop().split('.')[0];
      deleteImage(publicId);
    }

    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Project deleted' });

  } catch (err) {
    res.status(500).json({ message: 'Failed to delete project', error: err.message });
  }
};
