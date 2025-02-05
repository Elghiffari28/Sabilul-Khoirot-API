import express from "express";
import {
  getGuru,
  getGuruById,
  createGuru,
  updateGuru,
  deleteGuru,
} from "../controllers/Guru.js";
import { upload } from "../config/UploadImage.js";
const router = express.Router();

router.get("/guru", getGuru);
router.get("/guru/:id", getGuruById);
router.post("/guru", upload.none(), createGuru);
router.patch("/guru/:id", upload.single("foto"), updateGuru);
router.delete("/guru/:id", deleteGuru);

export default router;
