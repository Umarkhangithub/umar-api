import Skill from "../models/skillsModel.js";

// @desc    Create new skill
export const createSkill = async (req, res) => {
  try {
    const skill = new Skill(req.body);
    const savedSkill = await skill.save();
    res.status(201).json({message: "Skill added successfully", skill: savedSkill});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all skills
export const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.status(200).json({message: "Skills fetched successfully", skills});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single skill by ID
export const getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: "Skill not found" });
    res.status(200).json({message: "Skill fetched successfully", skill});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a skill
export const updateSkill = async (req, res) => {
  try {
    const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedSkill) return res.status(404).json({ message: "Skill not found" });
    res.status(200).json({message: "Skill updated successfully", skill: updatedSkill});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a skill
export const deleteSkill = async (req, res) => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id);
    if (!deletedSkill) return res.status(404).json({ message: "Skill not found" });
    res.status(200).json({ message: "Skill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
