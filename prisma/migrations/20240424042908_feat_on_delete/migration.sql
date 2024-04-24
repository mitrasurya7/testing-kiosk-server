-- DropForeignKey
ALTER TABLE "contents" DROP CONSTRAINT "contents_templateId_fkey";

-- DropForeignKey
ALTER TABLE "contents" DROP CONSTRAINT "contents_userId_fkey";

-- DropForeignKey
ALTER TABLE "devices" DROP CONSTRAINT "devices_locationId_fkey";

-- DropForeignKey
ALTER TABLE "templates" DROP CONSTRAINT "templates_deviceId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_locationId_fkey";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "templates" ADD CONSTRAINT "templates_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "devices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
