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

/**
 * @swagger
 * /komentar:
 *   get:
 *     summary: Ambil semua komentar
 *     tags: [Komentar]
 *     responses:
 *       200:
 *         description: Daftar semua komentar
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Komentar'
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.get("/komentar", getKomentar);
// router.get("/Komentar/:id", verifyUser, getKomentarById);
/**
 * @swagger
 * /komentar/{karyaId}:
 *   post:
 *     summary: Membuat komentar baru
 *     tags: [Komentar]
 *     parameters:
 *       - in: path
 *         name: karyaId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID karya yang akan diberi komentar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isi
 *             properties:
 *               isi:
 *                 type: string
 *                 example: "Ini komentar baru di karya!"
 *     responses:
 *       201:
 *         description: Komentar berhasil dibuat
 *       401:
 *         description: User tidak memiliki akses untuk membuat komentar
 *       404:
 *         description: Karya tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.post("/komentar/:karyaId", upload.none(), verifyUser, createKomentar);
// router.patch("/Komentar/:id", verifyUser, updateKomentar);
/**
 * @swagger
 * /komentar/{id}:
 *   delete:
 *     summary: Menghapus komentar berdasarkan ID
 *     tags: [Komentar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID komentar yang akan dihapus
 *     responses:
 *       200:
 *         description: Komentar berhasil dihapus
 *       404:
 *         description: Komentar tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.delete("/komentar/:id", verifyUser, deleteKomentar);

export default router;
