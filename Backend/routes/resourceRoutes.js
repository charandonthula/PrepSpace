const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createResource,
  getWorkspaceResources,
  deleteResource,
} = require("../controllers/resourceController");

const workspaceMemberMiddleware = require("../middleware/workspaceMemberMiddleware");

const resourceDeleteMiddleware = require("../middleware/resourceDeleteMiddleware");

const upload = require("../middleware/uploadMiddleware");

router.post(
  "/workspace/:workspaceId/resource",

  authMiddleware,

  workspaceMemberMiddleware,

  upload.single("file"),

  createResource,
);
router.get(
  "/workspace/:workspaceId/resources",

  authMiddleware,

  workspaceMemberMiddleware,

  getWorkspaceResources,
);
router.delete(
  "/resource/:resourceId",

  authMiddleware,

  resourceDeleteMiddleware,

  deleteResource,
);
module.exports = router;
