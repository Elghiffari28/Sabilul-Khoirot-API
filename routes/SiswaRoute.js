import express from "express";
import {
  getSiswa,
  getSiswaById,
  createSiswa,
  updateSiswa,
  deleteSiswa,
} from "../controllers/Siswa.js";
import multer from "multer";
import { adminOnly, verifyUser } from "../middleware/AuthUser.js";
const upload = multer();
const router = express.Router();

router.get("/siswa", getSiswa);
router.get("/siswa/:id", getSiswaById);
router.post("/siswa", upload.none(), createSiswa, verifyUser, adminOnly);
router.patch("/siswa/:id", upload.none(), updateSiswa, verifyUser, adminOnly);
router.delete("/siswa/:id", deleteSiswa, verifyUser, adminOnly);

export default router;
