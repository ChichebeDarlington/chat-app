import express from "express";

// controllers functions
import { SendMessage, GetMessages } from "../controller/messageController.js";
import { ProtectedRoute } from "../middleware/protectedRoute.js";

const router = express.Router();

router.post("/send/:id", ProtectedRoute, SendMessage);
router.get("/:id", ProtectedRoute, GetMessages);

export default router;
