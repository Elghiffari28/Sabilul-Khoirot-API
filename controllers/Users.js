import User from "../models/User.js";
import { GETResponse, Response } from "../response.js";
import argon2 from "argon2";

export const getUser = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ["name", "email", "role", "uuid"],
    });
    GETResponse(200, response, "Get All Users", res);
  } catch (error) {
    Response(500, error.message, res);
  }
};
export const getUserById = async (req, res) => {
  console.log(req.params.id);
  try {
    const response = await User.findOne({
      attributes: ["name", "email", "password", "role", "uuid"],
      where: {
        uuid: req.params.id,
      },
    });
    GETResponse(200, response, "Get User By Id", res);
  } catch (error) {
    Response(500, error.message, res);
  }
};
export const createUser = async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body;
  console.log({ name, email, password, confirmPassword, role });
  if (password !== confirmPassword) {
    Response(400, "password dan confirm password tidak cocok", res);
  }
  const hashPassword = await argon2.hash(password);
  try {
    await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });
    Response(201, "Register berhasil", res);
  } catch (error) {
    Response(400, error.message, res);
  }
};
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const userId = req.userId;
  let user;
  if (id) {
    await User.findOne({
      where: {
        uuid: id,
      },
    });
  } else {
    await User.findOne({
      where: {
        id: userId,
      },
    });
  }
  if (!user) return Response(404, "User tidak ditemukan", res);
  const { name, email, password, confirmPassword, role } = req.body;
  console.log({ name, email, password, confirmPassword, role });
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confirmPassword) {
    Response(400, "password dan confirm password tidak cocok", res);
  }
  try {
    await User.update(
      {
        name: name,
        email: email,
        password: hashPassword,
        role: role,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    Response(200, "Update Data Berhasil", res);
  } catch (error) {
    Response(500, error.message, res);
  }
};
export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return Response(404, "User tidak ditemukan", res);
  try {
    await User.destroy({
      where: {
        id: user.id,
      },
    });
    Response(200, "User berhasil dihapus", res);
  } catch (error) {
    Response(500, error.message, res);
  }
};
