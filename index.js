import express from "express";
import session from "express-session";
import SequelizeStore from "connect-session-sequelize";
import db from "./config/Database.js";
import Guru from "./models/Guru.js";
import User from "./models/User.js";
import Karya from "./models/Karya.js";
import Berita from "./models/Berita.js";
import Komentar from "./models/Komentar.js";
import Siswa from "./models/Siswa.js";
import UserRoute from "./routes/UserRoute.js";
import GuruRoute from "./routes/GuruRoute.js";
import KaryaRoute from "./routes/KaryaRoute.js";
import BeritaRoute from "./routes/BeritaRoute.js";
import KomentarRoute from "./routes/KomentarRoute.js";
import SiswaRoute from "./routes/SiswaRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: db,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    store: store,
    saveUninitialized: true,
    cookie: {
      secure: "auto",
    },
  })
);
app.use(
  cors({
    origin: "http://localhost:3000", // URL frontend
    credentials: true, // Jika menggunakan cookie/session
  })
);
app.use("/image", express.static("public/images/"));

app.use(AuthRoute);
app.use(UserRoute);
app.use(GuruRoute);
app.use(KaryaRoute);
app.use(BeritaRoute);
app.use(KomentarRoute);
app.use(SiswaRoute);

// db.sync({ alter: true })
//   .then(() => console.log("Database tersingkronisasi"))
//   .catch((err) => console.log("Error singkronisasi database", err));

// store.sync();

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
