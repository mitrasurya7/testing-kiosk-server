/*
  Warnings:

  - You are about to drop the column `templateId` on the `contents` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "contents" DROP CONSTRAINT "contents_templateId_fkey";

-- AlterTable
ALTER TABLE "contents" DROP COLUMN "templateId",
ADD COLUMN     "layoutId" INTEGER;

-- AlterTable
ALTER TABLE "templates" ADD COLUMN     "layoutId" INTEGER;

-- CreateTable
CREATE TABLE "layouts" (
    "id" SERIAL NOT NULL,
    "status" BOOLEAN NOT NULL,
    "deviceId" VARCHAR(100),
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "layouts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "templates" ADD CONSTRAINT "templates_layoutId_fkey" FOREIGN KEY ("layoutId") REFERENCES "layouts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "layouts" ADD CONSTRAINT "layouts_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "devices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_layoutId_fkey" FOREIGN KEY ("layoutId") REFERENCES "layouts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
