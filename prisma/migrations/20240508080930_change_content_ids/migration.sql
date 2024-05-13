/*
  Warnings:

  - You are about to drop the column `contentId` on the `layouts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "layouts" DROP CONSTRAINT "layouts_contentId_fkey";

-- AlterTable
ALTER TABLE "layouts" DROP COLUMN "contentId",
ADD COLUMN     "contentIds" INTEGER[];
