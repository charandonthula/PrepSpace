const Resource = require("../models/Resource");

const Workspace = require("../models/Workspace");

const resourceDeleteMiddleware = async (req, res, next) => {
  try {
    const resource = await Resource.findById(req.params.resourceId);

    if (!resource) {
      return res.status(404).json({
        message: "Resource not found",
      });
    }

    const workspace = await Workspace.findById(resource.workspaceId);

    const isUploader = resource.createdBy.toString() === req.user.userId;

    const isWorkspaceOwner = workspace.createdBy.toString() === req.user.userId;

    if (!isUploader && !isWorkspaceOwner) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    next();
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Authorization failed",
    });
  }
};

module.exports = resourceDeleteMiddleware;
