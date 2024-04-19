/*
  Warnings:

  - The primary key for the `devices` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `devices` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[deviceId]` on the table `devices` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `deviceId` to the `devices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "devices" DROP CONSTRAINT "devices_pkey",
DROP COLUMN "id",
ADD COLUMN     "deviceId" VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "devices_deviceId_key" ON "devices"("deviceId");
