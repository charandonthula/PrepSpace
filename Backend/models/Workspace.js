const mongoose = require("mongoose");

const workspaceSchema = new mongoose.Schema({
  workspaceName: String,
  subject: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Workspace = mongoose.model("Workspace", workspaceSchema);

module.exports = Workspace;
