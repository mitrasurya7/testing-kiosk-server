-- DropForeignKey
ALTER TABLE "contents" DROP CONSTRAINT "contents_templateId_fkey";

-- DropForeignKey
ALTER TABLE "contents" DROP CONSTRAINT "contents_userId_fkey";

-- AlterTable
ALTER TABLE "contents" ALTER COLUMN "templateId" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "templates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
