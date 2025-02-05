import express from "express";
import {
  getSiswa,
  getSiswaById,
  createSiswa,
  updateSiswa,
  deleteSiswa,
} from "../controllers/Siswa.js";
import multer from "multer";
const upload = multer();
const router = express.Router();

router.get("/siswa", getSiswa);
router.get("/siswa/:id", getSiswaById);
router.post("/siswa", upload.none(), createSiswa);
router.patch("/siswa/:id", upload.none(), updateSiswa);
router.delete("/siswa/:id", deleteSiswa);

export default router;
