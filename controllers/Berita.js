import Berita from "../models/Berita.js";
import { GETResponse, Response } from "../response.js";
import User from "../models/User.js";
import { DeleteImage } from "../config/UploadImage.js";
import { Op } from "sequelize";

export const getBerita = async (req, res) => {
  try {
    const response = await Berita.findAll({
      attributes: ["uuid", "judul", "file", "createdAt"],
      include: [
        {
          model: User,
          attributes: ["name", "email", "role"],
        },
      ],
    });
    const beritaData = response.map((berita) => {
      let parsedFile = berita.toJSON(); // Konversi instance Sequelize ke objek JS
      if (parsedFile.file) {
        try {
          parsedFile.file = JSON.parse(parsedFile.file); // Parse JSON jika valid
        } catch (error) {
          console.error("Error parsing JSON:", error.message);
        }
      }
      return parsedFile; // Pastikan untuk mengembalikan data
    });
    GETResponse(200, beritaData, "Get All Berita", res);
  } catch (error) {
    Response(500, error.message, res);
  }
};
export const getTopBerita = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const response = await Berita.findAll({
      attributes: ["uuid", "judul", "file", "createdAt"],
      where: id
        ? {
            uuid: { [Op.ne]: id },
          }
        : {},
      include: [
        {
          model: User,
          attributes: ["name", "email", "role"],
        },
      ],
      limit: 4,
      order: [["createdAt", "DESC"]],
    });
    const beritaData = response.map((berita) => {
      let parsedFile = berita.toJSON(); // Konversi instance Sequelize ke objek JS
      if (parsedFile.file) {
        try {
          parsedFile.file = JSON.parse(parsedFile.file); // Parse JSON jika valid
        } catch (error) {
          console.error("Error parsing JSON:", error.message);
        }
      }
      return parsedFile; // Pastikan untuk mengembalikan data
    });
    GETResponse(200, beritaData, "Get All Berita", res);
  } catch (error) {
    Response(500, error.message, res);
  }
};
export const getBeritaById = async (req, res) => {
  try {
    const response = await Berita.findOne({
      include: [
        {
          model: User,
          attributes: ["name", "email", "role"],
        },
      ],
      where: {
        uuid: req.params.id,
      },
    });
    if (!response) return Response(404, "Berita tidak ditemukan", res);

    if (response.file) {
      response.file = JSON.parse(response.file);
    }
    GETResponse(200, response, "Get Berita By Id", res);
  } catch (error) {
    Response(500, error.message, res);
  }
};
export const createBerita = async (req, res) => {
  const { judul, deskripsi } = req.body;
  const files = req.files.map((file) => file.filename);
  if (!req.userId) return Response(401, "Harap login dahulu", res);
  try {
    await Berita.create({
      judul: judul,
      deskripsi: deskripsi,
      file: JSON.stringify(files),
      userId: req.userId,
    });
    Response(201, "Berita berhasil dibuat", res);
  } catch (error) {
    Response(500, error.message, res);
  }
};
export const updateBerita = (req, res) => {};
export const deleteBerita = async (req, res) => {
  const berita = await Berita.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!berita) return Response(404, "Berita tidak ditemukan", res);
  try {
    const result = await Berita.destroy({
      where: {
        id: berita.id,
      },
    });
    const files = JSON.parse(berita.file);
    if (result) {
      DeleteImage(files);
    }
    Response(200, "Berita berhasil dihapus", res);
  } catch (error) {
    console.log(error);
    Response(500, error.message, res);
  }
};
