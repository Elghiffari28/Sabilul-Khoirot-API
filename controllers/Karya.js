import Karya from "../models/Karya.js";
import { Response, GETResponse } from "../response.js";
import Komentar from "../models/Komentar.js";
import Guru from "../models/Guru.js";
import User from "../models/User.js";
import { DeleteImage, saveFiles } from "../config/UploadImage.js";

export const getKarya = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = "createdAt",
      order = "DESC",
    } = req.query;

    const offset = (page - 1) * limit;
    const karyas = await Karya.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sort, order]],
    });

    const meta = {
      totalData: karyas.count,
      totalPages: Math.ceil(karyas.count / limit),
      currentPage: parseInt(page),
      perPage: parseInt(limit),
    };
    GETResponse(200, karyas.rows, "Get All Karya", res, meta);
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
          attributes: ["id", "isi", "createdAt", "name"],
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
  // const file = req.file;
  // console.log(file);
  // console.log({ judul, deskripsi, author });
  try {
    const savedFiles = await saveFiles([req.file]);

    await Karya.create({
      judul,
      deskripsi,
      file: savedFiles[0],
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
  let fileName = karya.file;
  if (req.file) {
    DeleteImage(karya.file);
    const savedFiles = await saveFiles([req.file]);
    fileName = savedFiles[0];
  }
  console.log(fileName);
  console.log({ judul, deskripsi, author });
  try {
    await Karya.update(
      {
        judul,
        deskripsi,
        file: fileName,
        author,
      },
      {
        where: {
          id: karya.id,
        },
      }
    );
    GETResponse(200, karya, "Karya berhasil diupdate", res);
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
