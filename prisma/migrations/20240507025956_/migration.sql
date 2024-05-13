/*
  Warnings:

  - Added the required column `totalContents` to the `templates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "templates" ADD COLUMN     "totalContents" INTEGER NOT NULL;
