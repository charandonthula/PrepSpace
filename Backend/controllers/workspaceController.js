const Workspace = require("../models/Workspace");
const Resource = require("../models/Resource");
const fs = require("fs");

const createWorkspace = async (req, res) => {
  try {
    const newWorkspace = new Workspace({
      workspaceName: req.body.workspaceName,
      subject: req.body.subject,
      createdBy: req.user.userId,
      members: [req.user.userId],
    });

    await newWorkspace.save();

    res.json({
      message: "Workspace saved successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
//Global workspaces irrespective of login user
// const getWorkspaces = async (req, res) => {

//     try {

//         const workspaces = await Workspace.find();

//         res.json(workspaces);

//     } catch (error) {

//         console.log(error);

//         res.status(500).json({
//             message: "Error fetching workspaces"
//         });

//     }

// };

const getMyWorkspaces = async (req, res) => {
  try {
    const myWorkspaces = await Workspace.find({
      members: req.user.userId,
    });

    res.json(myWorkspaces);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error fetching workspaces",
    });
  }
};
const updateWorkspace = async (req, res) => {
  try {
    const updatedWorkspace = await Workspace.findByIdAndUpdate(
      req.params.id,

      {
        workspaceName: req.body.workspaceName,
        subject: req.body.subject,
      },

      { new: true },
    );

    res.json(updatedWorkspace);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error updating workspace",
    });
  }
};
const deleteWorkspace = async (req, res) => {
  try {
    const resources = await Resource.find({
      workspaceId: req.params.id,
    });
    resources.forEach((resource) => {
      if (resource.file) {
        fs.unlink(
          `uploads/${resource.file}`,

          (error) => {
            if (error) {
              console.log(error);
            }
          },
        );
      }
    });

    await Resource.deleteMany({
      workspaceId: req.params.id,
    });
    await Workspace.findByIdAndDelete(req.params.id);

    res.json({
      message: "Workspace deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error deleting workspace",
    });
  }
};

const joinWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.workspaceId);

    if (!workspace) {
      return res.status(404).json({
        message: "Workspace not found",
      });
    }
    const alreadyMember = workspace.members.includes(req.user.userId);

    if (alreadyMember) {
      return res.json({
        message: "Already joined workspace",
      });
    }
    workspace.members.push(req.user.userId);

    await workspace.save();

    res.json({
      message: "Joined workspace successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error joining workspace",
    });
  }
};
const getWorkspaceDetails = async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.workspaceId)

      .populate("createdBy", "name")

      .populate("members", "name");

    if (!workspace) {
      return res.status(404).json({
        message: "Workspace not found",
      });
    }

    res.json(workspace);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error fetching workspace",
    });
  }
};
const leaveWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.workspaceId);

    if (!workspace) {
      return res.status(404).json({
        message: "Workspace not found",
      });
    }

    if (workspace.createdBy.toString() === req.user.userId) {
      return res.status(400).json({
        message: "Creator cannot leave workspace",
      });
    }

    workspace.members = workspace.members.filter(
      (memberId) => memberId.toString() !== req.user.userId,
    );

    await workspace.save();

    res.json({
      message: "Left workspace successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error leaving workspace",
    });
  }
};
// module.exports = {
//     createWorkspace,
//     getWorkspaces,
//     updateWorkspace,
//     deleteWorkspace,
//     getMyWorkspaces
// };
module.exports = {
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
  getMyWorkspaces,
  joinWorkspace,
  getWorkspaceDetails,
  leaveWorkspace,
};
