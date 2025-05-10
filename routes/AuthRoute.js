import express from "express";
import { LogOut, Login, Me } from "../controllers/Auth.js";
const router = express.Router();

/**
 * @swagger
 * /me:
 *   get:
 *     summary: Ambil data user yang sedang login
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Info user yang sedang login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserWithGuru'
 *       401:
 *         description: Belum login
 *       404:
 *         description: User tidak ditemukan
 */
router.get("/me", Me);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: budi@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login berhasil
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserWithGuru'
 *       400:
 *         description: Password salah
 *       404:
 *         description: User tidak ditemukan
 */
router.post("/login", Login);
/**
 * @swagger
 * /logout:
 *   delete:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Berhasil logout
 *       400:
 *         description: Gagal logout
 */
router.delete("/logout", LogOut);

export default router;
