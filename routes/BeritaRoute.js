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

/**
 * @swagger
 * /berita:
 *   get:
 *     summary: Ambil semua data berita
 *     tags: [Berita]
 *     responses:
 *       200:
 *         description: List semua berita
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Berita'
 */
router.get("/berita", getBerita);

/**
 * @swagger
 * /berita/top:
 *   get:
 *     summary: Ambil 4 berita terbaru
 *     tags: [Berita]
 *     description: Ambil 4 berita terbaru, diurutkan berdasarkan waktu dibuat. Bisa melewatkan satu berita berdasarkan UUID.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: false
 *         description: UUID berita yang ingin dilewatkan (skip)
 *     responses:
 *       200:
 *         description: Berhasil mengambil 4 berita terbaru
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Berita'
 *       500:
 *         description: Terjadi kesalahan server
 */

router.get("/berita/top/:id?", getTopBerita);

/**
 * @swagger
 * /berita/{uuid}:
 *   get:
 *     summary: Ambil berita berdasarkan UUID
 *     tags: [Berita]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID berita
 *     responses:
 *       200:
 *         description: Detail berita
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Berita'
 *       404:
 *         description: Berita tidak ditemukan
 */
router.get("/berita/:id", getBeritaById);

/**
 * @swagger
 * /berita:
 *   post:
 *     summary: Tambah berita baru
 *     tags: [Berita]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Berita'
 *     responses:
 *       201:
 *         description: Berita berhasil ditambahkan
 */
router.post("/berita", upload.array("file", 5), verifyUser, createBerita);
// router.patch("/berita/id", updateBerita);

/**
 * @swagger
 * /berita/{uuid}:
 *   delete:
 *     summary: Hapus berita berdasarkan UUID
 *     tags: [Berita]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID berita
 *     responses:
 *       200:
 *         description: Berita berhasil dihapus
 *       404:
 *         description: Berita tidak ditemukan
 */
router.delete("/berita/:id", verifyUser, adminOnly, deleteBerita);

export default router;
