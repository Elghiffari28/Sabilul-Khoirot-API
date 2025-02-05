import User from "../models/User.js";
import Guru from "../models/Guru.js";
import argon2 from "argon2";
import { Response } from "../response.js";
import { Model } from "sequelize";

export const Login = async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
    include: [
      {
        model: Guru,
        as: "guru",
        required: false,
      },
    ],
  });
  if (!user) return Response(404, "User tidak ditemukan", res);
  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return Response(400, "Password Salah!", res);
  req.session.userId = user.uuid;
  const uuid = user.uuid;
  const name = user.name;
  const email = user.email;
  const role = user.role;
  const guru = user?.guru;
  Response(200, { uuid, name, email, role, guru }, res);
};

export const Me = async (req, res) => {
  if (!req.session.userId) {
    Response(401, "anda belum login", res);
    return null;
  }
  const user = await User.findOne({
    attributes: ["uuid", "name", "email", "role"],
    where: {
      uuid: req.session.userId,
    },
    include: [
      {
        model: Guru,
        as: "guru",
        required: false,
      },
    ],
  });
  if (!user) return Response(404, "User tidak ditemukan", res);
  Response(200, user, res);
};

export const LogOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return Response(400, "Tidak dapat logout", res);
    res.clearCookie("connect.sid");
    Response(200, "Anda telah logout", res);
  });
};
