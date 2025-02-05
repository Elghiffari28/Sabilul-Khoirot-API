import { Sequelize } from "sequelize";

const db = new Sequelize("sabilul_khoirot", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
