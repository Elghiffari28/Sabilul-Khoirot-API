import express from "express";
import {
  getKarya,
  getKaryaById,
  createKarya,
  updateKarya,
  deleteKarya,
} from "../controllers/Karya.js";
import { upload } from "../config/UploadImage.js";
import { verify } from "argon2";
import { adminOnly, verifyUser } from "../middleware/AuthUser.js";
const router = express.Router();

router.get("/karya", getKarya);
router.get("/karya/:id", getKaryaById);
router.post("/karya", upload.single("file"), createKarya);
router.patch("/karya/:id", upload.single("file"), verifyUser, updateKarya);
router.delete("/karya/:id", deleteKarya, verifyUser, adminOnly);

export default router;
