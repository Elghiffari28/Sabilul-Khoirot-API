import express from "express";
import {
  getBerita,
  getBeritaById,
  createBerita,
  updateBerita,
  deleteBerita,
  getTopBerita,
} from "../controllers/Berita.js";
import { adminOnly, verifyUser } from "../middleware/AuthUser.js";
import { upload } from "../config/UploadImage.js";
const router = express.Router();

router.get("/berita", getBerita);
router.get("/berita/top/:id?", getTopBerita);
router.get("/berita/:id", getBeritaById);
router.post("/berita", upload.array("file", 5), verifyUser, createBerita);
// router.patch("/berita/id", updateBerita);
router.delete("/berita/:id", verifyUser, adminOnly, deleteBerita);

export default router;
