import Service from "../models/servicesModel.js";

export const createService = async (req, res) => {
  try {
    const newService = new Service(req.body);
    await newService.save();
    res.status(201).json({ message: "Service created", service: newService });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json({ message: "All services", services });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Get a single service by ID

export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json({ message: "Service found", service });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const updateService = async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ message: "Service updated", service: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
