import AccessLog from "../models/AccessLog.js";

const accessLogger = async (req, res, next) => {
  try {
    await AccessLog.create({
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.headers["user-agent"],
      route: req.originalUrl,
      userId: req.user?.id || null, // tergantung ada autentikasi atau tidak
    });
  } catch (error) {
    console.error("Gagal mencatat access log:", error.message);
  }
  next();
};

export default accessLogger;
