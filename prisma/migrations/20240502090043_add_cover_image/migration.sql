/*
  Warnings:

  - Added the required column `coverImage` to the `templates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "templates" ADD COLUMN     "coverImage" VARCHAR(100) NOT NULL;
