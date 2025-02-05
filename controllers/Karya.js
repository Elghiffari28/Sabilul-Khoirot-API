import Karya from "../models/Karya.js";
import { Response, GETResponse } from "../response.js";
import Komentar from "../models/Komentar.js";
import Guru from "../models/Guru.js";
import User from "../models/User.js";
import { DeleteImage } from "../config/UploadImage.js";

export const getKarya = async (req, res) => {
  try {
    const response = await Karya.findAll();
    GETResponse(200, response, "Get All Karya", res);
  } catch (error) {
    Response(500, error.message, res);
  }
};
export const getKaryaById = async (req, res) => {
  try {
    const response = await Karya.findOne({
      include: [
        {
          model: Komentar,
          as: "komentar",
          attributes: ["isi", "createdAt", "name"],
        },
      ],
      where: {
        uuid: req.params.id,
      },
    });
    GETResponse(200, response, "Get Karya By Id", res);
  } catch (error) {
    Response(500, error.message, res);
  }
};
export const createKarya = async (req, res) => {
  const { judul, deskripsi, author } = req.body;
  const file = req.file;
  console.log(file);
  console.log({ judul, deskripsi, author });
  try {
    await Karya.create({
      judul,
      deskripsi,
      file: file.filename,
      author,
    });
    Response(201, "Karya berhasil ditambahkan", res);
  } catch (error) {
    Response(500, error.message, res);
  }
};
export const updateKarya = async (req, res) => {
  const { judul, deskripsi, author } = req.body;
  const karya = await Karya.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!karya) return Response(404, "Karya tidak ditemukan", res);
  let file;
  if (!req.file) {
    file = karya.file;
  } else {
    file = req.file.filename;
    DeleteImage(karya.file);
  }
  console.log(file);
  console.log({ judul, deskripsi, author });
  try {
    await Karya.update(
      {
        judul,
        deskripsi,
        file,
        author,
      },
      {
        where: {
          id: karya.id,
        },
      }
    );
    Response(200, "Karya berhasil diupdate", res);
  } catch (error) {
    Response(500, error.message, res);
  }
};
export const deleteKarya = async (req, res) => {
  const karya = await Karya.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!karya) return Response(404, "Karya tidak ditemukan", res);
  try {
    const result = await Karya.destroy({
      where: {
        id: karya.id,
      },
    });
    if (result) {
      DeleteImage(karya.file);
    }
    Response(200, "Karya berhasil dihapus", res);
  } catch (error) {
    console.log(error);
    Response(500, error.message, res);
  }
};
