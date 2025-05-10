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

/**
 * @swagger
 * /karya:
 *   get:
 *     summary: Ambil semua data karya
 *     tags: [Karya]
 *     responses:
 *       200:
 *         description: List semua karya
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Karya'
 */
router.get("/karya", getKarya);

/**
 * @swagger
 * /karya/{uuid}:
 *   get:
 *     summary: Ambil satu karya berdasarkan UUID
 *     tags: [Karya]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: UUID karya yang ingin diambil
 *     responses:
 *       200:
 *         description: Detail karya
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Karya'
 *       404:
 *         description: Karya tidak ditemukan
 */
router.get("/karya/:id", getKaryaById);

/**
 * @swagger
 * /karya:
 *   post:
 *     summary: Tambah karya baru
 *     tags: [Karya]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Karya'
 *     responses:
 *       201:
 *         description: Karya berhasil ditambahkan
 */
router.post("/karya", upload.single("file"), createKarya);

/**
 * @swagger
 * /karya/{uuid}:
 *   patch:
 *     summary: Update sebagian data karya berdasarkan UUID
 *     tags: [Karya]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: UUID karya yang akan diupdate
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               judul:
 *                 type: string
 *               deskripsi:
 *                 type: string
 *               file:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: Karya berhasil diupdate
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Karya'
 *       404:
 *         description: Karya tidak ditemukan
 */
router.patch("/karya/:id", upload.single("file"), verifyUser, updateKarya);

/**
 * @swagger
 * /karya/{uuid}:
 *   delete:
 *     summary: Hapus karya berdasarkan UUID
 *     tags: [Karya]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: UUID dari karya
 *     responses:
 *       200:
 *         description: Karya berhasil dihapus
 *       404:
 *         description: Karya tidak ditemukan
 */
router.delete("/karya/:id", deleteKarya, verifyUser, adminOnly);

export default router;
