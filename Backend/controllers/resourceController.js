const Resource = require("../models/Resource");

const createResource = async (req, res) => {
  try {
    if (!req.body.content && !req.body.link && !req.file) {
      return res.status(400).json({
        message: "Resource cannot be empty",
      });
    }
    console.log(req.file);
    const newResource = new Resource({
      content: req.body.content,

      link: req.body.link,

      // file: req.file ? req.file.filename : null,
      file: req.file ? req.file.path : null,

      workspaceId: req.params.workspaceId,

      createdBy: req.user.userId,
    });

    await newResource.save();

    res.json({
      message: "Resource created successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error creating resource",
    });
  }
};
const getWorkspaceResources = async (req, res) => {
  try {
    const resources = await Resource.find({
      workspaceId: req.params.workspaceId,
    }).populate("createdBy", "name");

    res.json(resources);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error fetching resources",
    });
  }
};
const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.resourceId);

    if (!resource) {
      return res.status(404).json({
        message: "Resource not found",
      });
    }

    await Resource.findByIdAndDelete(req.params.resourceId);

    res.json({
      message: "Resource deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error deleting resource",
    });
  }
};
module.exports = {
  createResource,
  getWorkspaceResources,
  deleteResource,
};
