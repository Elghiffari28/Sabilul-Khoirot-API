import express from "express";
import {
  getGuru,
  getGuruById,
  createGuru,
  updateGuru,
  deleteGuru,
} from "../controllers/Guru.js";
import { upload } from "../config/UploadImage.js";
import { adminOnly, verifyUser } from "../middleware/AuthUser.js";
const router = express.Router();

/**
 * @swagger
 * /guru:
 *   get:
 *     summary: Ambil semua data guru
 *     tags: [Guru]
 *     responses:
 *       200:
 *         description: List semua guru
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Guru'
 */
router.get("/guru", getGuru);

/**
 * @swagger
 * /guru/{uuid}:
 *   get:
 *     summary: Ambil guru berdasarkan UUID
 *     tags: [Guru]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID guru yang ingin diambil
 *     responses:
 *       200:
 *         description: Detail guru ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Guru'
 *       404:
 *         description: Guru tidak ditemukan
 */
router.get("/guru/:id", getGuruById);

/**
 * @swagger
 * /guru:
 *   post:
 *     summary: Tambah data guru baru
 *     tags: [Guru]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Guru'
 *     responses:
 *       201:
 *         description: Guru berhasil ditambahkan
 *       400:
 *         description: Data tidak valid
 */
router.post("/guru", upload.none(), createGuru, adminOnly, verifyUser);

/**
 * @swagger
 * /guru/{uuid}:
 *   patch:
 *     summary: Update sebagian data guru
 *     tags: [Guru]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID guru yang ingin diupdate
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               jabatan:
 *                 type: string
 *               alamat:
 *                 type: string
 *               # ... tambahkan field lainnya sesuai kebutuhan
 *     responses:
 *       200:
 *         description: Data guru berhasil diupdate
 *       404:
 *         description: Guru tidak ditemukan
 */
router.patch("/guru/:id", upload.single("foto"), verifyUser, updateGuru);

/**
 * @swagger
 * /guru/{uuid}:
 *   delete:
 *     summary: Hapus data guru
 *     tags: [Guru]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID guru yang ingin dihapus
 *     responses:
 *       200:
 *         description: Guru berhasil dihapus
 *       404:
 *         description: Guru tidak ditemukan
 */
router.delete("/guru/:id", deleteGuru, verifyUser, adminOnly);

export default router;
