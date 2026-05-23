const express = require("express");

const router = express.Router();

//const { createWorkspace,getWorkspaces,updateWorkspace, deleteWorkspace,getMyWorkspaces} = require("../controllers/workspaceController");
const { createWorkspace,updateWorkspace, deleteWorkspace,getMyWorkspaces,joinWorkspace,getWorkspaceDetails,leaveWorkspace} = require("../controllers/workspaceController");

const authMiddleware = require("../middleware/authMiddleware");

const ownerMiddleware = require("../middleware/ownerMiddleware");
const workspaceMemberMiddleware = require("../middleware/workspaceMemberMiddleware");


//router.post("/create-workspace", createWorkspace);
//router.get("/workspaces", getWorkspaces);
router.post(

    "/create-workspace",

    authMiddleware,

    createWorkspace

);
router.get(

    "/my-workspaces",

    authMiddleware,

    getMyWorkspaces

);
// router.put("/workspace/:id", updateWorkspace);
router.put(

    "/workspace/:id",

    authMiddleware,

    ownerMiddleware,

    updateWorkspace

);
// router.delete("/workspace/:id", deleteWorkspace);
router.delete(

    "/workspace/:id",

    authMiddleware,

    ownerMiddleware,

    deleteWorkspace

);
router.post(

    "/workspace/:workspaceId/join",

    authMiddleware,

    joinWorkspace

);
router.get(

    "/workspace/:workspaceId",

    authMiddleware,

    workspaceMemberMiddleware,

    getWorkspaceDetails

);
router.post(

    "/workspace/:workspaceId/leave",

    authMiddleware,

    leaveWorkspace

);
module.exports = router;