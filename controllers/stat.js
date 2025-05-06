import User from "../models/User.js";
import Karya from "../models/Karya.js";
import Poster from "../models/Poster.js";
import AccessLog from "../models/AccessLog.js";
import { Op, Sequelize } from "sequelize";

export const getStat = async (req, res) => {
  try {
    const activePosters = await Poster.count({ where: { isActive: true } });

    const users = await User.findAll({
      attributes: [
        [
          Sequelize.fn("DATE_FORMAT", Sequelize.col("createdAt"), "%Y-%m"),
          "month",
        ],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "totalUsers"],
      ],
      group: [Sequelize.fn("DATE_FORMAT", Sequelize.col("createdAt"), "%Y-%m")],
      order: [["month", "ASC"]],
    });

    const karya = await Karya.findAll({
      attributes: [
        [
          Sequelize.fn("DATE_FORMAT", Sequelize.col("createdAt"), "%Y-%m"),
          "month",
        ],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "totalKarya"],
      ],
      group: [Sequelize.fn("DATE_FORMAT", Sequelize.col("createdAt"), "%Y-%m")],
      order: [["month", "ASC"]],
    });

    const accessLogs = await AccessLog.findAll({
      attributes: [
        [
          Sequelize.fn("DATE_FORMAT", Sequelize.col("createdAt"), "%Y-%m"),
          "month",
        ],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "totalAccessLogs"],
      ],
      group: [Sequelize.fn("DATE_FORMAT", Sequelize.col("createdAt"), "%Y-%m")],
      order: [["month", "ASC"]],
    });

    // Contoh: hitung jumlah akses hari ini dari tabel AccessLog

    const months = users.map((user) => user.get("month"));
    const totalUsersPerMonth = users.map((user) => user.get("totalUsers"));
    const totalKaryaUploadPerMonth = karya.map((k) => k.get("totalKarya"));
    const visitorsPerMonth = accessLogs.map((log) =>
      log.get("totalAccessLogs")
    );

    res.json({
      months,
      totalUsersPerMonth,
      activePosters,
      totalKaryaUploadPerMonth,
      visitorsPerMonth,
    });
  } catch (error) {
    console.error("Statistik error:", error);
    res.status(500).json({ error: "Gagal mengambil statistik" });
  }
};
