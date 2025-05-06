import Poster from "../models/Poster.js";
import { GETResponse, Response } from "../response.js";
import { saveFiles, DeleteImage } from "../config/UploadImage.js";

export const getPoster = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = "createdAt",
      order = "DESC",
    } = req.query;

    const offset = (page - 1) * limit;
    const posters = await Poster.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sort, order]],
    });

    const meta = {
      totalData: posters.count,
      totalPages: Math.ceil(posters.count / limit),
      currentPage: parseInt(page),
      perPage: parseInt(limit),
    };
    GETResponse(200, posters.rows, "Get all poster", res, meta);
  } catch (error) {
    Response(500, error.message, res);
  }
};
export const getPosterByJenis = async (req, res) => {
  try {
    const { jenis } = req.params;
    const normalizedJenis = jenis.toUpperCase();

    const response = await Poster.findAll({
      where: {
        jenis: normalizedJenis,
      },
    });
    if (response.length === 0) {
      return Response(404, "Poster tidak ditemukan", res);
    }

    GETResponse(200, response, "Get all poster by jenis", res);
  } catch (error) {
    Response(500, error.message, res);
  }
};

export const createPoster = async (req, res) => {
  const { jenis, nama, tahun } = req.body;
  console.log("object", req.file);
  console.log("ini kuda", { jenis, nama, tahun });

  if (!req.file) {
    return res.status(400).send("File not uploaded");
  }
  try {
    const savedFiles = await saveFiles([req.file]);
    console.log("ini nama file", savedFiles);

    await Poster.create({
      jenis,
      nama,
      tahun,
      file: savedFiles[0],
    });
    Response(201, "Poster berhasil ditambahkan", res);
  } catch (error) {
    Response(500, error.message, res);
  }
};

export const updatePoster = async (req, res) => {
  const { jenis, nama, tahun } = req.body;
  const poster = await Poster.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!poster) return Response(404, "Poster tidak ditemukan", res);
  let fileName = poster.file;
  if (req.file) {
    DeleteImage(poster.file);
    const savedFiles = await saveFiles([req.file]);
    fileName = savedFiles[0];
  }
  try {
    await Poster.update(
      {
        jenis,
        nama,
        tahun,
        file: fileName,
      },
      {
        where: {
          id: poster.id,
        },
      }
    );
    const updatedPoster = await Poster.findOne({ where: { id: poster.id } });
    GETResponse(200, updatedPoster, "Poster berhasil diupdate", res);
  } catch (error) {
    Response(500, error.message, res);
  }
};
export const updatePosterIsActive = async (req, res) => {
  try {
    const { id } = req.params; // ambil id dari params
    const { isActive } = req.body; // ambil nilai isActive dari body request

    // Cari poster berdasarkan id
    const poster = await Poster.findByPk(id);

    if (!poster) {
      return res.status(404).json({ msg: "Poster tidak ditemukan gays" });
    }

    // Update isActive
    poster.isActive = isActive;
    await poster.save();

    GETResponse(200, poster, "status poster berhasil diperbaharui", res);
  } catch (error) {
    Response(500, error.message, res);
  }
};

export const deletePoster = async (req, res) => {
  const poster = await Poster.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!poster) return Response(404, "Poster tidak ditemukan", res);

  try {
    const result = await Poster.destroy({
      where: {
        id: poster.id,
      },
    });
    if (result) {
      DeleteImage(poster.file);
    }
    Response(200, "Poster berhasil dihapus", res);
  } catch (error) {
    Response(500, error.message, res);
  }
};
