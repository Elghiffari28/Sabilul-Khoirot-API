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
import seedAdmin from "./config/SeedAdmin.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: db,
  checkExpirationInterval: 15 * 60 * 1000,
  // Set waktu expired sesi (misalnya 1 jam)
  expiration: 2 * 60 * 60 * 1000,
});

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    store: store,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: "auto",
      sameSite: "None",
      maxAge: 2 * 3600000,
    },
    rolling: true,
  })
);
// app.use((req, res, next) => {
//   console.log("Session ID:", req.sessionID);
//   console.log("Session Data:", req.session);
//   next();
// });
app.use("/image", express.static("public/images/"));

app.use(AuthRoute);
app.use(UserRoute);
app.use(GuruRoute);
app.use(KaryaRoute);
app.use(BeritaRoute);
app.use(KomentarRoute);
app.use(SiswaRoute);

// db.authenticate()
//   .then(() => console.log("Database connected!"))
//   .catch((err) => console.log("Error:", err));

// db.sync({ alter: true })
//   .then(() => console.log("Database tersingkronisasi"))
//   .catch((err) => console.log("Error singkronisasi database", err));

store.sync();

const startServer = async () => {
  try {
    // Koneksi ke database
    await db.authenticate();
    console.log("✅ Database connected!");

    // Jalankan seeder
    await seedAdmin();

    // Jalankan server
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server berjalan di port ${port}`);
    });
  } catch (error) {
    console.error("❌ Error saat menjalankan server:", error);
  }
};

startServer();
