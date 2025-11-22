-- AlterTable
ALTER TABLE "chargingHubs" ADD COLUMN     "available" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "connectors" ADD COLUMN     "available" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "stations" ADD COLUMN     "available" BOOLEAN NOT NULL DEFAULT true;
