import express from "express";
import {
  getBerita,
  getBeritaById,
  createBerita,
  updateBerita,
  deleteBerita,
} from "../controllers/Berita.js";
import { verifyUser } from "../middleware/AuthUser.js";
import { upload } from "../config/UploadImage.js";
const router = express.Router();

router.get("/berita", getBerita);
router.get("/berita/:id", getBeritaById);
router.post("/berita", upload.array("file", 5), verifyUser, createBerita);
// router.patch("/berita/id", updateBerita);
router.delete("/berita/:id", deleteBerita);

export default router;
