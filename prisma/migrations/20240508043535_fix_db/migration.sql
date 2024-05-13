/*
  Warnings:

  - You are about to drop the column `layoutId` on the `contents` table. All the data in the column will be lost.
  - You are about to drop the column `templateId` on the `devices` table. All the data in the column will be lost.
  - You are about to drop the column `layoutId` on the `templates` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "contents" DROP CONSTRAINT "contents_layoutId_fkey";

-- DropForeignKey
ALTER TABLE "devices" DROP CONSTRAINT "devices_templateId_fkey";

-- DropForeignKey
ALTER TABLE "templates" DROP CONSTRAINT "templates_layoutId_fkey";

-- AlterTable
ALTER TABLE "contents" DROP COLUMN "layoutId";

-- AlterTable
ALTER TABLE "devices" DROP COLUMN "templateId";

-- AlterTable
ALTER TABLE "layouts" ADD COLUMN     "contentId" INTEGER,
ADD COLUMN     "templateId" INTEGER;

-- AlterTable
ALTER TABLE "templates" DROP COLUMN "layoutId";

-- AddForeignKey
ALTER TABLE "layouts" ADD CONSTRAINT "layouts_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "contents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "layouts" ADD CONSTRAINT "layouts_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "templates"("id") ON DELETE SET NULL ON UPDATE CASCADE;
