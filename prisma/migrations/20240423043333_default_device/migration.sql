/*
  Warnings:

  - Made the column `instalationDate` on table `devices` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "devices" ALTER COLUMN "instalationDate" SET NOT NULL,
ALTER COLUMN "instalationDate" SET DEFAULT CURRENT_TIMESTAMP;
