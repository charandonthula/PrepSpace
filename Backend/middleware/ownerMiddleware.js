const Workspace = require("../models/Workspace");

const ownerMiddleware = async (req, res, next) => {

    try {

        const workspace = await Workspace.findById(

            req.params.id

        );

        if (!workspace) {

            return res.status(404).json({
                message: "Workspace not found"
            });

        }

        const isOwner =

            workspace.createdBy.toString()

            ===

            req.user.userId;

        if (!isOwner) {

            return res.status(403).json({
                message: "Only workspace owner allowed"
            });

        }

        next();

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Authorization failed"
        });

    }

};

module.exports = ownerMiddleware;