import argon2 from "argon2";
import User from "../models/User.js";

const seedAdmin = async () => {
  try {
    // Cek apakah admin sudah ada
    const adminExists = await User.findOne({
      where: { role: "admin" },
    });

    if (!adminExists) {
      const hashedPassword = await argon2.hash("admin123");

      await User.create({
        name: "Admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "admin",
      });

      console.log("✅ Admin default berhasil dibuat!");
    } else {
      console.log("⚠ Admin sudah ada, tidak perlu dibuat lagi.");
    }
  } catch (error) {
    console.error("❌ Gagal membuat admin:", error);
  }
};

export default seedAdmin;
