import Project from '../models/projectModel.js';
import cloudinary from '../utils/cloudinary.js';
import { deleteImage } from '../utils/deleteImage.js';

// Create Project
export const createProject = async (req, res) => {
  try {
    const { title, description, techStack, liveDemo, githubLink } = req.body;

    let imageUrl = null;

    if (req.file) {
      const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      const result = await cloudinary.uploader.upload(base64Image, {
        folder: 'Images',
        resource_type: 'image',
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
      liveDemo,
      githubLink,
      image: imageUrl,
    });

    await project.save();
    res.status(201).json({ message: 'Project created successfully', project });
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).json({ message: 'Failed to create project', error: err.message });
  }
};

// Get All Projects (with pagination)
export const getAllProjects = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const [projects, totalProjects] = await Promise.all([
      Project.find().skip(skip).limit(limit),
      Project.countDocuments(),
    ]);

    res.status(200).json({
      projects,
      totalProjects,
      totalPages: Math.ceil(totalProjects / limit),
      currentPage: page,
      projectsPerPage: limit,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch projects', error: err.message });
  }
};

// Get Single Project
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!id || id.length !== 24) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project fetched successfully", project });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch project",
      error: err.message,
    });
  }
};


// Update Project
export const updateProject = async (req, res) => {
  try {
    const updates = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (req.file) {
      if (project.image) {
        const segments = project.image.split('/');
        const filename = segments[segments.length - 1];
        const publicId = `Images/${filename.split('.')[0]}`;
        await deleteImage(publicId);
      }

      const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      const result = await cloudinary.uploader.upload(base64Image, {
        folder: 'Images',
        resource_type: 'image',
        transformation: [
          { width: 800, height: 600, crop: 'limit' },
          { quality: 'auto' },
        ],
      });

      updates.image = result.secure_url;
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update project', error: err.message });
  }
};

// Delete Project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.image) {
      const segments = project.image.split('/');
      const filename = segments[segments.length - 1];
      const publicId = `Images/${filename.split('.')[0]}`;
      await deleteImage(publicId);
    }

    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete project', error: err.message });
  }
};
