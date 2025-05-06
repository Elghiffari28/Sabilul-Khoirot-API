import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import User from "./User.js";

const AccessLog = db.define(
  "access_log",
  {
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userAgent: {
      type: DataTypes.STRING,
    },
    route: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

// Relasi
User.hasMany(AccessLog);
AccessLog.belongsTo(User, { foreignKey: "userId" });

export default AccessLog;
