import User from "../models/User.js";
import { Response } from "../response.js";

export const verifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return Response(401, "Harap Login terlebih dahulu", res);
  }
  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return Response(404, "User tidak ditemukan", res);
  req.userId = user.id;
  req.role = user.role;
  next();
};

export const adminOnly = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return Response(404, "User tidak ditemukan", res);
  if (user.role !== "admin") return Response(403, "Akses terlarang", res);
  next();
};
