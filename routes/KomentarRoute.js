import express from "express";
import {
  getKomentar,
  createKomentar,
  deleteKomentar,
} from "../controllers/Komentar.js";
import { adminOnly, verifyUser } from "../middleware/AuthUser.js";
import multer from "multer";
const upload = multer();
const router = express.Router();

router.get("/komentar", getKomentar);
// router.get("/Komentar/:id", verifyUser, getKomentarById);
router.post("/komentar/:karyaId", upload.none(), verifyUser, createKomentar);
// router.patch("/Komentar/:id", verifyUser, updateKomentar);
router.delete("/komentar/:id", verifyUser, deleteKomentar);

export default router;
