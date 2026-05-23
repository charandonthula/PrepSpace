const Workspace = require("../models/Workspace");

const workspaceMemberMiddleware = async (req, res, next) => {
  try {
    const workspace = await Workspace.findById(req.params.workspaceId);

    if (!workspace) {
      return res.status(404).json({
        message: "Workspace not found",
      });
    }

    const isMember = workspace.members.includes(req.user.userId);

    if (!isMember) {
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

module.exports = workspaceMemberMiddleware;
