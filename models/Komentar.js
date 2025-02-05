import { Sequelize, DataTypes } from "sequelize";
import Guru from "./Guru.js";
import Karya from "./Karya.js";
import db from "../config/Database.js";

const Komentar = db.define(
  "komentar",
  {
    uuid: {
      type: DataTypes.TEXT,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    isi: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

Komentar.belongsTo(Guru, { foreignKey: "guruId", as: "guru" });
Guru.hasMany(Komentar, { foreignKey: "guruId", as: "komentar" });

Komentar.belongsTo(Karya, {
  foreignKey: "karyaSiswaId",
  as: "karyaSiswa",
  onDelete: "CASCADE",
});
Karya.hasMany(Komentar, {
  foreignKey: "karyaSiswaId",
  as: "komentar",
  onDelete: "CASCADE",
});

export default Komentar;
