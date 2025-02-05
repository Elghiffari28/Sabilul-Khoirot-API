import Komentar from "../models/Komentar.js";
import { GETResponse, Response } from "../response.js";
import User from "../models/User.js";
import Karya from "../models/Karya.js";
import Guru from "../models/Guru.js";

export const getKomentar = async (req, res) => {
  try {
    const response = await Komentar.findAll({
      include: [
        {
          model: Karya,
          as: "karyaSiswa",
          attributes: ["judul", "author", "uuid"],
        },
      ],
    });
    GETResponse(200, response, "Get All Komentar", res);
  } catch (error) {
    Response(500, error.message, res);
  }
};
// export const getKomentarById = async (req, res) => {
//   try {
//     const response = await Komentar.findOne({
//       include: [
//         {
//           model: User,
//           attributes: ["name", "email", "role"],
//         },
//       ],
//       where: {
//         uuid: req.params.id,
//       },
//     });
//     GETResponse(200, response, "Get Komentar By Id", res);
//   } catch (error) {
//     Response(500, error.message, res);
//   }
// };
export const createKomentar = async (req, res) => {
  const userId = req.userId;
  const karyaId = req.params.karyaId;
  const { isi } = req.body;
  console.log({ userId, karyaId, isi });
  if (req.role === "admin")
    return Response(401, "Harap masuk sebagai guru terlebih dahulu", res);
  const karya = await Karya.findOne({
    where: {
      uuid: karyaId,
    },
  });
  if (!karya) {
    return res.status(404).json({ message: "Karya tidak ditemukan" });
  }
  const user = await User.findOne({
    where: {
      id: userId,
    },
    include: {
      model: Guru,
      as: "guru",
      attributes: ["id", "name"],
    },
  });
  if (!user) {
    return res.status(404).json({ message: "User tidak ditemukan" });
  }
  // res.send(user);
  try {
    await Komentar.create({
      guruId: user.guru.id,
      karyaSiswaId: karya.id,
      isi,
      name: user.guru.name,
    });
    Response(201, "Komentar berhasil dibuat", res);
  } catch (error) {
    console.log(error);
    Response(500, error.message, res);
  }
};
// export const updateKomentar = (req, res) => {};
export const deleteKomentar = async (req, res) => {
  const komentar = await Komentar.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!komentar) return Response(404, "Komentar tidak ditemukan", res);
  try {
    await Komentar.destroy({
      where: {
        id: komentar.id,
      },
    });
    Response(200, "Komentar berhasil dihapus", res);
  } catch (error) {
    Response(500, error.message, res);
  }
};
