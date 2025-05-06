import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Konfigurasi Swagger
const options = {
  definition: {
    openapi: "3.0.0", // Versi OpenAPI
    info: {
      title: "SABILUL KHOIROT",
      version: "1.0.0",
      description: "Sabilul Khoirot API Documentation",
    },
    components: {
      schemas: {
        Guru: {
          type: "object",
          properties: {
            uuid: { type: "string" },
            name: { type: "string" },
            nrg: { type: "string" },
            nik: { type: "string" },
            no_sk_awal: { type: "string" },
            gender: { type: "string" },
            agama: { type: "string" },
            nohp: { type: "string" },
            tahun_masuk: { type: "string" },
            tempat_lahir: { type: "string" },
            tanggal_lahir: { type: "string", format: "date" },
            alamat: { type: "string" },
            jabatan: { type: "string" },
            foto: { type: "string" },
            userId: { type: "integer" },
          },
        },
        Siswa: {
          type: "object",
          properties: {
            name: { type: "string" },
            nik: { type: "string" },
            tempat_lahir: { type: "string" },
            tanggal_lahir: { type: "string", format: "date" },
            alamat: { type: "string" },
            nama_ayah: { type: "string" },
            nama_ibu: { type: "string" },
            gender: { type: "string", enum: ["Laki-laki", "Perempuan"] },
            agama: { type: "string" },
            nohp: { type: "string" },
            tahun_masuk: { type: "string" },
          },
          required: [
            "name",
            "nik",
            "tempat_lahir",
            "tanggal_lahir",
            "alamat",
            "nama_ayah",
            "nama_ibu",
            "gender",
            "agama",
            "nohp",
            "tahun_masuk",
          ],
        },
        Berita: {
          type: "object",
          properties: {
            uuid: {
              type: "string",
              example: "c1b2a3e4-f5g6-h7i8-j9k0-l1m2n3o4p5q6",
            },
            judul: {
              type: "string",
              example: "Peluncuran Website Sekolah",
            },
            deskripsi: {
              type: "string",
              example:
                "Website resmi sekolah telah resmi diluncurkan untuk publik.",
            },
            file: {
              type: "string",
              example: "poster-launching.jpg",
            },
            userId: {
              type: "integer",
              example: 1,
            },
          },
        },
        User: {
          type: "object",
          properties: {
            uuid: {
              type: "string",
              example: "b3e2d6f8-1a23-4567-89ab-cdef12345678",
            },
            name: {
              type: "string",
              example: "Budi Santoso",
            },
            email: {
              type: "string",
              example: "budi@example.com",
            },
            password: {
              type: "string",
              example: "hashed_password_123",
            },
            role: {
              type: "string",
              enum: ["guru", "admin"],
              example: "guru",
            },
          },
        },
        UserWithGuru: {
          type: "object",
          properties: {
            uuid: { type: "string", example: "a7b4b5d2-...uuid..." },
            name: { type: "string", example: "Budi" },
            email: { type: "string", example: "budi@example.com" },
            role: { type: "string", enum: ["guru", "admin"], example: "guru" },
            guru: {
              type: "object",
              nullable: true,
              properties: {
                uuid: { type: "string", example: "guru-uuid" },
                name: { type: "string", example: "Budi" },
                // tambahkan properti lain sesuai kebutuhan
              },
            },
          },
        },
        Komentar: {
          type: "object",
          properties: {
            uuid: {
              type: "string",
              example: "123e4567-e89b-12d3-a456-426614174000",
            },
            isi: {
              type: "string",
              example: "Komentar yang sangat menarik!",
            },
            name: {
              type: "string",
              example: "Guru Budi",
            },
            karyaSiswa: {
              type: "object",
              properties: {
                uuid: { type: "string", example: "abcd1234-xyz-5678" },
                judul: { type: "string", example: "Karya Seni 1" },
                author: { type: "string", example: "Siswa A" },
              },
            },
          },
        },
        Karya: {
          type: "object",
          properties: {
            uuid: {
              type: "string",
              example: "b1fcdcc1-3b2c-4cf7-a123-bb5d5f55e600",
            },
            judul: { type: "string", example: "Poster Edukasi Digital" },
            deskripsi: {
              type: "string",
              example:
                "Sebuah karya visual tentang pentingnya literasi digital.",
            },
            file: { type: "string", example: "poster-edukasi.jpg" },
            author: { type: "string", example: "Ibu Sari" },
          },
        },
        Poster: {
          type: "object",
          properties: {
            uuid: {
              type: "string",
              description: "UUID dari poster",
              example: "b1fcdcc1-3b2c-4cf7-a123-bb5d5f55e600", // contoh UUID
            },
            jenis: {
              type: "string",
              description: "Jenis poster",
              example: "PPDB", // contoh jenis poster
            },
            nama: {
              type: "string",
              description: "Nama poster",
              example: "Poster Penerimaan Siswa Baru", // contoh nama poster
            },
            tahun: {
              type: "integer",
              description: "Tahun poster",
              example: 2025, // contoh tahun
            },
            file: {
              type: "string",
              description: "Lokasi file poster",
              example: "poster_ppdb_2025.jpg", // contoh file
            },
            isActive: {
              type: "boolean",
              description: "Status aktif dari poster",
              example: true, // contoh status aktif
            },
          },
        },
      },
    },
  },
  // Lokasi file dengan komentar Swagger
  apis: ["./routes/*.js"], // Sesuaikan dengan lokasi file route API kamu
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };
