/*
  Warnings:

  - You are about to drop the column `typeId` on the `contents` table. All the data in the column will be lost.
  - You are about to drop the `types` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `contents` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "contents" DROP CONSTRAINT "contents_typeId_fkey";

-- AlterTable
ALTER TABLE "contents" DROP COLUMN "typeId",
ADD COLUMN     "type" VARCHAR(100) NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "devices" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "locations" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "templates" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "types";
