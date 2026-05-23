const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },

    link: {
      type: String,
    },

    file: {
      type: String,
    },
    
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const Resource = mongoose.model("Resource", resourceSchema);

module.exports = Resource;
