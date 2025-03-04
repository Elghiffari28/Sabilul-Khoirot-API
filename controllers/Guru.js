import { Sequelize } from "sequelize";
import Guru from "../models/Guru.js";
import User from "../models/User.js";
import argon2 from "argon2";
import db from "../config/Database.js";
import { DATAResponse, GETResponse, Response } from "../response.js";
import { DeleteImage } from "../config/UploadImage.js";

export const getGuru = async (req, res) => {
  try {
    const response = await Guru.findAll();
    GETResponse(200, response, "Get All Guru", res);
  } catch (error) {
    Response(500, error.message, res);
  }
};
export const getGuruById = async (req, res) => {
  try {
    const response = await Guru.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    GETResponse(200, response, "Get Guru By Id", res);
  } catch (error) {
    Response(500, error.message, res);
  }
};
export const createGuru = async (req, res) => {
  const {
    email,
    password,
    name,
    nrg,
    nik,
    no_sk_awal,
    tempat_lahir,
    tanggal_lahir,
    alamat,
    jabatan,
    gender,
    agama,
    nohp,
    tahun_masuk,
  } = req.body;
  console.log({
    name,
    nrg,
    tempat_lahir,
    tanggal_lahir,
    alamat,
    jabatan,
    gender,
    agama,
    nohp,
    tahun_masuk,
  });
  const hashPassword = await argon2.hash(password);
  const t = await db.transaction();
  try {
    const user = await User.create(
      {
        name,
        password: hashPassword,
        email,
        role: "guru",
      },
      { transaction: t }
    );
    const guru = await Guru.create(
      {
        name: name,
        nrg,
        nik,
        no_sk_awal,
        tempat_lahir: tempat_lahir,
        tanggal_lahir: tanggal_lahir,
        alamat: alamat,
        jabatan: jabatan,
        gender: gender,
        agama: agama,
        nohp: nohp,
        tahun_masuk: tahun_masuk,
        userId: user.id,
      },
      { transaction: t }
    );
    await t.commit();
    DATAResponse(201, guru, "Data guru dan user berhasil ditambahkan", res);
  } catch (error) {
    Response(500, error.message, res);
  }
};
export const updateGuru = async (req, res) => {
  const guru = await Guru.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!guru) return Response(404, "Guru tidak ditemukan", res);
  const {
    name,
    nrg,
    nik,
    no_sk_awal,
    tempat_lahir,
    tanggal_lahir,
    alamat,
    jabatan,
    gender,
    agama,
    nohp,
    tahun_masuk,
  } = req.body;
  let file;
  if (!req.file) {
    file = guru.foto;
  } else {
    DeleteImage(guru.foto);
    file = req.file.filename;
  }
  console.log(file);
  console.log(nik.length);
  // console.log("Data to Update:", {
  //   name,
  //   nrg,
  //   nik,
  //   no_sk_awal,
  //   tempat_lahir,
  //   tanggal_lahir,
  //   alamat,
  //   jabatan,
  //   gender,
  //   agama,
  //   nohp,
  //   tahun_masuk,
  // });
  const user = await User.findOne({
    where: {
      name: name,
    },
  });
  // console.log(user.id);
  try {
    await Guru.update(
      {
        name: name,
        nrg,
        nik,
        no_sk_awal,
        tempat_lahir: tempat_lahir,
        tanggal_lahir: tanggal_lahir,
        alamat: alamat,
        jabatan: jabatan,
        gender: gender,
        agama: agama,
        nohp: nohp,
        tahun_masuk: tahun_masuk,
        userId: user.id,
        foto: file,
      },
      {
        where: {
          id: guru.id,
        },
      }
    );
    Response(201, "Data guru berhasil diupdate", res);
  } catch (error) {
    Response(500, error.message, res);
  }
};
export const deleteGuru = async (req, res) => {
  const guru = await Guru.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!guru) return Response(404, "Guru tidak ditemukan", res);
  try {
    const result = await Guru.destroy({
      where: {
        id: guru.id,
      },
    });
    if (result) {
      DeleteImage(guru.foto);
    }
    await User.destroy({
      where: {
        id: guru.userId,
      },
    });
    Response(200, "Guru berhasil dihapus", res);
  } catch (error) {
    Response(500, error.message, res);
  }
};
