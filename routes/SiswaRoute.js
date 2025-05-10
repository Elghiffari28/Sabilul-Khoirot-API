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

/**
 * @openapi
 * /siswa:
 *   get:
 *     tags:
 *       - Siswa
 *     summary: "Ambil semua data siswa"
 *     description: "Mengambil semua data siswa dengan pagination"
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *         description: Nomor halaman
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *         description: Jumlah data per halaman
 *       - in: query
 *         name: sort
 *         required: false
 *         schema:
 *           type: string
 *         description: Kolom untuk sorting
 *       - in: query
 *         name: order
 *         required: false
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *         description: Urutan sorting
 *     responses:
 *       200:
 *         description: Daftar siswa berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Siswa'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     totalData:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *                     perPage:
 *                       type: integer
 */
router.get("/siswa", getSiswa);

/**
 * @openapi
 * /siswa/{id}:
 *   get:
 *     tags:
 *       - Siswa
 *     summary: "Ambil data siswa berdasarkan ID"
 *     description: "Mengambil detail siswa berdasarkan UUID"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID siswa
 *     responses:
 *       200:
 *         description: Detail siswa berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Siswa'
 */
router.get("/siswa/:id", getSiswaById);

/**
 * @openapi
 * /siswa:
 *   post:
 *     tags:
 *       - Siswa
 *     summary: "Buat data siswa baru"
 *     description: "Menambahkan siswa baru"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Siswa'
 *     responses:
 *       201:
 *         description: Data siswa berhasil ditambahkan
 */
router.post("/siswa", upload.none(), createSiswa, verifyUser, adminOnly);

/**
 * @openapi
 * /siswa/{id}:
 *   patch:
 *     tags:
 *       - Siswa
 *     summary: "Update data siswa"
 *     description: "Memperbarui data siswa"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID siswa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Siswa'
 *     responses:
 *       200:
 *         description: Data siswa berhasil diperbarui
 */
router.patch("/siswa/:id", upload.none(), updateSiswa, verifyUser, adminOnly);

/**
 * @openapi
 * /siswa/{id}:
 *   delete:
 *     tags:
 *       - Siswa
 *     summary: "Hapus data siswa"
 *     description: "Menghapus data siswa berdasarkan ID"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID siswa
 *     responses:
 *       200:
 *         description: Siswa berhasil dihapus
 */
router.delete("/siswa/:id", deleteSiswa, verifyUser, adminOnly);

export default router;
