# Backend Intro API

*Simple backend project* yang di-develop menggunakan Node.js dan Express.js. *Project* ini di-build dengan *modular structure*, meng-apply prinsip DRY (*Don't Repeat Yourself*), serta men-support *basic* operasi CRUD menggunakan JSON sebagai *storage system*.

## Key Features
- **Modular Structure**: *Separation of concerns* antara *routes* dan *main logic* aplikasi biar *codebase* lebih rapi dan *maintainable*.
- **RESTful API**: Men-support *basic* HTTP *operations* (GET, POST, DELETE) buat *data manipulation*.
- **Middleware**: Dilengkapi dengan *logging system* untuk nge-track aktivitas *request* secara *real-time* langsung di terminal.
- **Environment Security**: Menggunakan modul `dotenv` buat nge-protect *environment variables* dan konfigurasi sistem dari kebocoran data.

## Prerequisites & Installation
*Make sure* kamu udah nge-install Node.js di *local machine* kamu. Silakan *clone repository* ini menggunakan command `git clone https://github.com/kar1mmmm/backend-intro.git`, lalu masuk ke *project folder* dengan `cd backend-intro`.

Setelah berada di dalam *root directory*, *run* command `npm install` buat men-download semua *dependencies* yang dibutuhin (seperti `express` dan `dotenv`).

*Next step*, bikin file baru bernama `.env` di *root directory* dan *copy-paste* format *key* dari file `.env.example` ke dalamnya.

## How to Run
Untuk nge-start *server*, ketik command `node index.js` di terminal. Kalau *running well*, bakal muncul log di terminal yang ngasih tahu kalau *server* udah *up and running* di `http://localhost:3000`.

Kamu bisa pakai *tools* API *client* kayak Thunder Client atau Postman buat nge-test berbagai *endpoints* yang *available* di bawah ini.

## API Endpoints
- `GET /` : Nge-check *health status* dari *server*.
- `GET /api/sekolah/:id` : *Fetch* spesifik data *based on unique ID*.
- `POST /api/sekolah/` : *Create* data baru ke dalam sistem (*make sure* kirim *payload* datanya dalam format JSON lewat *request body*).
- `DELETE /api/sekolah/:id` : Nge-delete data secara permanen *based on* ID.