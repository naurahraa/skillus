-- CreateEnum
CREATE TYPE "Role" AS ENUM ('peserta', 'penyelenggara', 'admin');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('draft', 'published');

-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('registered', 'checked_in', 'cancelled');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('pending', 'success', 'failed');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "role" "Role" NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "peserta_profiles" (
    "user_id" INTEGER NOT NULL,
    "nama_lengkap" TEXT,
    "institusi" TEXT,
    "no_hp" TEXT,

    CONSTRAINT "peserta_profiles_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "penyelenggara_profiles" (
    "user_id" INTEGER NOT NULL,
    "nama_pic" TEXT,
    "organisasi" TEXT,
    "no_hp" TEXT,

    CONSTRAINT "penyelenggara_profiles_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "penyelenggara_id" INTEGER NOT NULL,
    "judul" VARCHAR(150) NOT NULL,
    "deskripsi" TEXT,
    "kategori" VARCHAR(50),
    "lokasi" VARCHAR(100),
    "tanggal" DATE,
    "harga" INTEGER NOT NULL DEFAULT 0,
    "kuota" INTEGER NOT NULL DEFAULT 0,
    "poster" TEXT,
    "status" "EventStatus" NOT NULL DEFAULT 'published',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registrations" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,
    "status" "RegistrationStatus" NOT NULL DEFAULT 'registered',
    "qr_code" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "registrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "registration_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "status" "TransactionStatus" NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "registrations_user_id_event_id_key" ON "registrations"("user_id", "event_id");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_registration_id_key" ON "transactions"("registration_id");

-- AddForeignKey
ALTER TABLE "peserta_profiles" ADD CONSTRAINT "peserta_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "penyelenggara_profiles" ADD CONSTRAINT "penyelenggara_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_penyelenggara_id_fkey" FOREIGN KEY ("penyelenggara_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_registration_id_fkey" FOREIGN KEY ("registration_id") REFERENCES "registrations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
