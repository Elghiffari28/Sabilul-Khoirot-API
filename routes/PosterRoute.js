import express from "express";
import { upload } from "../config/UploadImage.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
import {
  getPosterByJenis,
  updatePosterIsActive,
  getPoster,
  updatePoster,
  createPoster,
  deletePoster,
} from "../controllers/Poster.js";
const router = express.Router();

/**
 * @swagger
 * /poster:
 *   get:
 *     summary: Mengambil semua poster
 *     tags: [Poster]
 *     responses:
 *       200:
 *         description: Berhasil mengambil semua poster
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Poster'
 *       500:
 *         description: Gagal mengambil data poster
 */
router.get("/poster", getPoster);

/**
 * @swagger
 * /poster/{jenis}/{tahun}:
 *   get:
 *     summary: Mengambil poster berdasarkan jenis dan tahun
 *     tags: [Poster]
 *     parameters:
 *       - in: path
 *         name: jenis
 *         required: true
 *         description: Jenis poster yang ingin dicari
 *         schema:
 *           type: string
 *       - in: path
 *         name: tahun
 *         required: true
 *         description: Tahun poster yang ingin dicari
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Berhasil mengambil poster berdasarkan jenis dan tahun
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Poster'
 *       400:
 *         description: Jenis atau tahun tidak ditemukan dalam parameter
 *       404:
 *         description: Poster tidak ditemukan
 *       500:
 *         description: Gagal mengambil data poster
 */
router.get("/poster/:jenis", getPosterByJenis);

/**
 * @swagger
 * /poster/{id}:
 *   patch:
 *     summary: Memperbarui data poster
 *     tags: [Poster]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dari poster yang akan diperbarui
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Poster'
 *     responses:
 *       200:
 *         description: Poster berhasil diperbarui
 *       500:
 *         description: Gagal memperbarui poster
 */
router.patch(
  "/poster/:id",
  upload.single("file"),
  updatePoster,
  verifyUser,
  adminOnly
);

/**
 * @swagger
 * /poster/{id}/isactive:
 *   patch:
 *     summary: Memperbarui status aktif poster (isActive)
 *     tags: [Poster]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dari poster yang ingin diperbarui status isActive-nya
 *         schema:
 *           type: string
 *       - in: body
 *         name: isActive
 *         required: true
 *         description: Status aktif dari poster (true/false)
 *         schema:
 *           type: boolean
 *           example: true
 *     responses:
 *       200:
 *         description: Status poster berhasil diperbaharui
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Poster'
 *       404:
 *         description: Poster tidak ditemukan
 *       500:
 *         description: Gagal memperbaharui status poster
 */
router.patch("/poster/toggle/:id", updatePosterIsActive, verifyUser, adminOnly);

/**
 * @swagger
 * /poster:
 *   post:
 *     summary: Menambahkan poster baru
 *     tags: [Poster]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Poster'
 *     responses:
 *       201:
 *         description: Poster berhasil ditambahkan
 *       500:
 *         description: Gagal menambahkan poster
 */
router.post(
  "/poster",
  upload.single("file"),
  createPoster,
  verifyUser,
  adminOnly
);

/**
 * @swagger
 * /poster/{id}:
 *   delete:
 *     summary: Menghapus poster berdasarkan UUID
 *     tags: [Poster]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: UUID dari poster yang ingin dihapus
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Poster berhasil dihapus
 *       404:
 *         description: Poster tidak ditemukan
 *       500:
 *         description: Gagal menghapus poster
 */
router.delete("/poster/:id", deletePoster, verifyUser, adminOnly);

export default router;
