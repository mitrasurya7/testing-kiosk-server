/*
  Warnings:

  - Added the required column `activeTemplate` to the `devices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "devices" ADD COLUMN     "activeTemplate" INTEGER NOT NULL;
