-- CreateTable
CREATE TABLE "public"."users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."files" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" INTEGER NOT NULL,
    "chargeSessionId" INTEGER,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."chargeSessions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "connectorId" INTEGER NOT NULL,
    "providerId" INTEGER NOT NULL,
    "description" TEXT,
    "extraFees" DOUBLE PRECISION NOT NULL,
    "startTime" TEXT,
    "endTime" TEXT,
    "kwh" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "invoiceId" INTEGER,

    CONSTRAINT "chargeSessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."chargingHubs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT,
    "street" TEXT,
    "streetNumber" INTEGER,
    "houseNumber" INTEGER,
    "postalCode" TEXT,
    "country" TEXT,
    "phoneNumber" TEXT,
    "email" TEXT,
    "url" TEXT,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "chargingHubs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."stations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "serialNumber" TEXT,
    "chargingHubId" INTEGER NOT NULL,
    "publicId" INTEGER,
    "privateId" INTEGER,

    CONSTRAINT "stations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."publicStations" (
    "id" SERIAL NOT NULL,
    "stationId" INTEGER NOT NULL,
    "providerId" INTEGER,
    "imageUrl" TEXT,
    "customId" TEXT,

    CONSTRAINT "publicStations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."privateStations" (
    "id" SERIAL NOT NULL,
    "stationId" INTEGER NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "privateStations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."connectors" (
    "id" SERIAL NOT NULL,
    "dc" BOOLEAN NOT NULL,
    "type" TEXT NOT NULL,
    "power" INTEGER NOT NULL,
    "needCable" BOOLEAN NOT NULL,
    "stationId" INTEGER NOT NULL,

    CONSTRAINT "connectors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."chargeTariffs" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "validFrom" TIMESTAMP(3) NOT NULL,
    "validTo" TIMESTAMP(3),

    CONSTRAINT "chargeTariffs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TariffTimes" (
    "id" SERIAL NOT NULL,
    "days" INTEGER[],
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "tariffId" INTEGER NOT NULL,

    CONSTRAINT "TariffTimes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."providers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "phoneNumber" TEXT,
    "email" TEXT,
    "url" TEXT,
    "importUrl" TEXT,

    CONSTRAINT "providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_PublicStationToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PublicStationToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_ChargeTariffToConnector" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ChargeTariffToConnector_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "chargeSessions_invoiceId_key" ON "public"."chargeSessions"("invoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "publicStations_stationId_key" ON "public"."publicStations"("stationId");

-- CreateIndex
CREATE UNIQUE INDEX "privateStations_stationId_key" ON "public"."privateStations"("stationId");

-- CreateIndex
CREATE INDEX "_PublicStationToUser_B_index" ON "public"."_PublicStationToUser"("B");

-- CreateIndex
CREATE INDEX "_ChargeTariffToConnector_B_index" ON "public"."_ChargeTariffToConnector"("B");

-- AddForeignKey
ALTER TABLE "public"."files" ADD CONSTRAINT "files_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."chargeSessions" ADD CONSTRAINT "chargeSessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chargeSessions" ADD CONSTRAINT "chargeSessions_connectorId_fkey" FOREIGN KEY ("connectorId") REFERENCES "public"."connectors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chargeSessions" ADD CONSTRAINT "chargeSessions_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "public"."providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chargeSessions" ADD CONSTRAINT "chargeSessions_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "public"."files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stations" ADD CONSTRAINT "stations_chargingHubId_fkey" FOREIGN KEY ("chargingHubId") REFERENCES "public"."chargingHubs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."publicStations" ADD CONSTRAINT "publicStations_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "public"."stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."publicStations" ADD CONSTRAINT "publicStations_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "public"."providers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."privateStations" ADD CONSTRAINT "privateStations_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "public"."stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."privateStations" ADD CONSTRAINT "privateStations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."connectors" ADD CONSTRAINT "connectors_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "public"."stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TariffTimes" ADD CONSTRAINT "TariffTimes_tariffId_fkey" FOREIGN KEY ("tariffId") REFERENCES "public"."chargeTariffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PublicStationToUser" ADD CONSTRAINT "_PublicStationToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."publicStations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PublicStationToUser" ADD CONSTRAINT "_PublicStationToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ChargeTariffToConnector" ADD CONSTRAINT "_ChargeTariffToConnector_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."chargeTariffs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ChargeTariffToConnector" ADD CONSTRAINT "_ChargeTariffToConnector_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."connectors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
