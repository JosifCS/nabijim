/*
  Warnings:

  - The primary key for the `connectors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `_ChargeTariffToConnector` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `stationId` to the `chargeSessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `connectorId` to the `chargeTariffs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stationId` to the `chargeTariffs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ChargeTariffToConnector" DROP CONSTRAINT "_ChargeTariffToConnector_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChargeTariffToConnector" DROP CONSTRAINT "_ChargeTariffToConnector_B_fkey";

-- DropForeignKey
ALTER TABLE "chargeSessions" DROP CONSTRAINT "chargeSessions_connectorId_fkey";

-- AlterTable
ALTER TABLE "chargeSessions" ADD COLUMN     "stationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "chargeTariffs" ADD COLUMN     "connectorId" INTEGER NOT NULL,
ADD COLUMN     "stationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "connectors" DROP CONSTRAINT "connectors_pkey",
ADD CONSTRAINT "connectors_pkey" PRIMARY KEY ("id", "stationId");

-- DropTable
DROP TABLE "_ChargeTariffToConnector";

-- AddForeignKey
ALTER TABLE "chargeSessions" ADD CONSTRAINT "chargeSessions_stationId_connectorId_fkey" FOREIGN KEY ("stationId", "connectorId") REFERENCES "connectors"("stationId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chargeTariffs" ADD CONSTRAINT "chargeTariffs_stationId_connectorId_fkey" FOREIGN KEY ("stationId", "connectorId") REFERENCES "connectors"("stationId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;
