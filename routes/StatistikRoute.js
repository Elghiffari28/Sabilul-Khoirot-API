import express from "express";
import { getStat } from "../controllers/stat.js";
const router = express.Router();

router.get("/stat", getStat);

export default router;
