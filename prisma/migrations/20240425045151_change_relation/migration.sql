/*
  Warnings:

  - You are about to drop the column `activeTemplate` on the `devices` table. All the data in the column will be lost.
  - You are about to drop the column `deviceId` on the `templates` table. All the data in the column will be lost.
  - Added the required column `templateId` to the `devices` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "templates" DROP CONSTRAINT "templates_deviceId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_locationId_fkey";

-- AlterTable
ALTER TABLE "devices" DROP COLUMN "activeTemplate",
ADD COLUMN     "templateId" INTEGER NOT NULL,
ALTER COLUMN "locationId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "templates" DROP COLUMN "deviceId";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
