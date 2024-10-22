import express from "express";

// controllers functions
import { GetUsersForSidebar } from "../controller/userController.js";
import { ProtectedRoute } from "../middleware/protectedRoute.js";

const router = express.Router();

router.get("/users", ProtectedRoute, GetUsersForSidebar);

export default router;
