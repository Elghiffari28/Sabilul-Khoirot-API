import express from "express";
import { LogOut, Login, Me } from "../controllers/Auth.js";
const router = express.Router();

router.get("/me", Me);
router.post("/login", Login);
router.delete("/logout", LogOut);

export default router;
