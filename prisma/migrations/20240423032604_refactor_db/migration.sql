/*
  Warnings:

  - You are about to drop the column `name` on the `contents` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `contents` table. All the data in the column will be lost.
  - You are about to drop the column `deviceId` on the `devices` table. All the data in the column will be lost.
  - You are about to drop the column `last_offline` on the `devices` table. All the data in the column will be lost.
  - You are about to drop the column `last_online` on the `devices` table. All the data in the column will be lost.
  - You are about to drop the column `templateId` on the `devices` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `locations` table. All the data in the column will be lost.
  - You are about to drop the column `html_template` on the `templates` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `devices` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `contents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `contents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `contents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `devices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `devices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deviceId` to the `templates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `htmlCode` to the `templates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `templates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "devices" DROP CONSTRAINT "devices_templateId_fkey";

-- DropIndex
DROP INDEX "devices_deviceId_key";

-- AlterTable
ALTER TABLE "contents" DROP COLUMN "name",
DROP COLUMN "type",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "title" VARCHAR(100) NOT NULL,
ADD COLUMN     "typeId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "devices" DROP COLUMN "deviceId",
DROP COLUMN "last_offline",
DROP COLUMN "last_online",
DROP COLUMN "templateId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" VARCHAR(100) NOT NULL,
ADD COLUMN     "instalationDate" TIMESTAMP(3),
ADD COLUMN     "lastOffline" TIMESTAMP(3),
ADD COLUMN     "lastOnline" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "devices_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "locations" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "templates" DROP COLUMN "html_template",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deviceId" TEXT NOT NULL,
ADD COLUMN     "htmlCode" TEXT NOT NULL,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "types" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "devices_id_key" ON "devices"("id");

-- AddForeignKey
ALTER TABLE "templates" ADD CONSTRAINT "templates_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "devices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
