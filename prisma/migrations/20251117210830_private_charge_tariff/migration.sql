-- AlterTable
ALTER TABLE "chargeTariffs" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "chargeTariffs" ADD CONSTRAINT "chargeTariffs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
