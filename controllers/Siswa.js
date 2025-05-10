import Siswa from "../models/Siswa.js";
import { DATAResponse, GETResponse, Response } from "../response.js";

export const getSiswa = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = "createdAt",
      order = "DESC",
    } = req.query;

    const offset = (page - 1) * limit;
    const siswas = await Siswa.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sort, order]],
    });

    const meta = {
      totalData: siswas.count,
      totalPages: Math.ceil(siswas.count / limit),
      currentPage: parseInt(page),
      perPage: parseInt(limit),
    };
    GETResponse(200, siswas.rows, "Get All Siswa", res, meta);
  } catch (error) {
    Response(500, error.message, res);
  }
};
export const getSiswaById = async (req, res) => {
  try {
    const response = await Siswa.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    GETResponse(200, response, "Get Siswa By Id", res);
  } catch (error) {
    Response(500, error.message, res);
  }
};
export const createSiswa = async (req, res) => {
  const {
    name,
    nik,
    tempat_lahir,
    tanggal_lahir,
    alamat,
    nama_ayah,
    nama_ibu,
    gender,
    agama,
    nohp,
    tahun_masuk,
  } = req.body;
  console.log({
    name,
    nik,
    tempat_lahir,
    tanggal_lahir,
    alamat,
    nama_ayah,
    nama_ibu,
    gender,
    agama,
    nohp,
    tahun_masuk,
  });
  try {
    const siswa = await Siswa.create({
      name,
      nik,
      tempat_lahir,
      tanggal_lahir,
      alamat,
      nama_ayah,
      nama_ibu,
      gender,
      agama,
      nohp,
      tahun_masuk,
    });
    DATAResponse(201, siswa, "Data Siswa berhasil ditambahkan", res);
  } catch (error) {
    Response(500, error.message, res);
  }
};
export const updateSiswa = async (req, res) => {
  const siswa = await Siswa.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!siswa) return Response(404, "Siswa tidak ditemukan", res);
  const {
    name,
    nik,
    tempat_lahir,
    tanggal_lahir,
    alamat,
    nama_ayah,
    nama_ibu,
    gender,
    agama,
    nohp,
    tahun_masuk,
  } = req.body;
  try {
    await Siswa.update(
      {
        name,
        nik,
        tempat_lahir,
        tanggal_lahir,
        alamat,
        nama_ayah,
        nama_ibu,
        gender,
        agama,
        nohp,
        tahun_masuk,
      },
      {
        where: {
          id: siswa.id,
        },
      }
    );
    Response(201, "Data siswa berhasil diupdate", res);
  } catch (error) {
    Response(500, error.message, res);
  }
};
export const deleteSiswa = async (req, res) => {
  const siswa = await Siswa.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!siswa) return Response(404, "Siswa tidak ditemukan", res);
  try {
    await Siswa.destroy({
      where: {
        id: siswa.id,
      },
    });
    Response(200, "Siswa berhasil dihapus", res);
  } catch (error) {
    Response(500, error.message, res);
  }
};
