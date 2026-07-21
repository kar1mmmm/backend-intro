# Backend Intro API

Backend Intro API adalah project backend yang dibangun menggunakan Node.js dan Express.js. Project ini menerapkan struktur modular dan prinsip DRY untuk memastikan kode tetap rapi serta mudah dikelola dalam skala panjang.

Pada versi terbaru ini, sistem penyimpanan data telah ditingkatkan dari penyimpanan JSON dasar menjadi database relasional menggunakan MySQL. Pembaruan ini memastikan integritas data yang lebih baik dan mendukung relasi antar tabel yang lebih kompleks.

Selain itu, project ini sekarang dilengkapi dengan sistem autentikasi pengguna yang aman. Teknologi enkripsi password menggunakan bcrypt telah diintegrasikan untuk melindungi data kredensial pengguna dari potensi kebocoran.

## Key Features

Fitur utama dari project ini adalah struktur modular yang memisahkan antara routing dan logika utama aplikasi. Pemisahan ini dipadukan dengan dukungan RESTful API untuk operasi standar seperti GET, POST, dan DELETE pada manajemen data.

Keamanan dan penanganan galat juga menjadi fokus utama dengan hadirnya Global Error Handler dan middleware logging. Sistem ini akan mencegat setiap error dari database atau validasi, lalu mengubahnya menjadi respons JSON yang rapi tanpa membuat server mati.

Untuk urusan konfigurasi, aplikasi ini menggunakan modul dotenv untuk mengamankan variabel lingkungan. Koneksi ke database MySQL juga dikelola menggunakan sistem connection pool dari mysql2 agar performa query lebih stabil dan efisien.

## Prerequisites & Installation

Pastikan kamu sudah menginstal Node.js dan sistem database MySQL seperti MariaDB di komputer lokalmu. Silakan clone repository ini menggunakan perintah git clone https://github.com/kar1mmmm/backend-intro.git melalui terminal, lalu masuk ke folder project dengan perintah cd backend-intro.

Setelah berada di dalam folder utama, jalankan perintah npm install untuk mengunduh semua dependensi yang dibutuhkan. Proses ini akan menginstal paket penting seperti express, dotenv, bcrypt, dan mysql2 secara otomatis ke dalam sistemmu.

Langkah terakhir adalah membuat file baru bernama .env di folder utama dan menyalin format konfigurasi dari file .env.example. Jangan lupa untuk membuat database baru di MySQL dan menyesuaikan kredensial username serta password di dalam file .env tersebut.

## How to Run

Untuk mulai menyalakan server, kamu hanya perlu mengetikkan perintah node index.js di dalam terminal. Pastikan layanan database MySQL milikmu sudah dalam keadaan aktif sebelum menjalankan perintah ini agar koneksi pool bisa terbentuk.

Jika semuanya berjalan lancar, terminal akan menampilkan pesan log yang mengonfirmasi bahwa server telah berhasil berjalan di alamat http://localhost:3000. Setiap aktivitas permintaan dari klien nantinya juga akan tercatat secara langsung di layar terminal ini.

Kamu bisa menggunakan alat bantu API client seperti Thunder Client di VS Code atau Postman untuk menguji berbagai endpoint yang tersedia. Pastikan untuk selalu memeriksa kesesuaian format data JSON yang dikirimkan pada bagian request body agar lolos sistem validasi.

## API Endpoints

Aplikasi ini memiliki endpoint dasar yaitu GET / untuk memeriksa status kesehatan dari server. Selain itu, terdapat endpoint manajemen sekolah yang meliputi GET /api/sekolah/:id untuk mengambil data spesifik, POST /api/sekolah/ untuk menambah data baru, dan DELETE /api/sekolah/:id untuk menghapus data.

Fitur terbaru yang ditambahkan adalah sistem autentikasi yang dapat diakses melalui endpoint POST /api/auth/register. Endpoint ini bertugas untuk mendaftarkan pengguna baru dengan menerima payload berupa username dan password, di mana sistem akan otomatis menolak pendaftaran jika terdapat duplikasi data.

Semua respons dari endpoint tersebut telah distandardisasi menggunakan format JSON untuk memudahkan integrasi dengan sisi frontend. Jika terjadi kesalahan input atau gangguan server, sistem akan mengembalikan status kode HTTP yang sesuai beserta pesan error yang jelas.