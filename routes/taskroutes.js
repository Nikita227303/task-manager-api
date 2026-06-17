const express = require("express");
const router = express.Router();
const authMiddleware=require("../middleware/authmiddleware");
const {
    gettasks,
    createTask,
    gettaskbyid,
    updatetaskbyid,
    deletetask,
    gettaskStats
} = require("../controllers/taskcontroller");
router.get("/stats",authMiddleware,gettaskStats);

router.get("/", authMiddleware, gettasks);
router.post("/", authMiddleware, createTask);

router.get("/:id",authMiddleware,gettaskbyid);
router.put("/:id",authMiddleware,updatetaskbyid);
router.delete("/:id",authMiddleware,deletetask);

module.exports = router;    