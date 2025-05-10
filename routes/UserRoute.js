import express from "express";
import {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/Users.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Ambil semua user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Daftar semua user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/user", verifyUser, adminOnly, getUser);
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Ambil semua user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Daftar semua user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/user/:id", verifyUser, getUserById);
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Tambah user baru
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [guru, admin]
 *     responses:
 *       201:
 *         description: User berhasil dibuat
 */
router.post("/user", createUser, verifyUser, adminOnly);
/**
 * @swagger
 * /users/{uuid}:
 *   patch:
 *     summary: Update user berdasarkan UUID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [guru, admin]
 *     responses:
 *       200:
 *         description: User berhasil diupdate
 *       404:
 *         description: User tidak ditemukan
 */
router.patch("/user/:id?", verifyUser, updateUser);
/**
 * @swagger
 * /users/{uuid}:
 *   delete:
 *     summary: Hapus user berdasarkan UUID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User berhasil dihapus
 *       404:
 *         description: User tidak ditemukan
 */
router.delete("/user/:id", verifyUser, adminOnly, deleteUser);

export default router;
