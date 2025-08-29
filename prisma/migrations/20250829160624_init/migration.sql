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
CREATE TABLE "public"."chargeSession" (
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

    CONSTRAINT "chargeSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."stations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT,
    "street" TEXT,
    "streetNumber" INTEGER,
    "houseNumber" INTEGER,
    "publicId" INTEGER,
    "privateId" INTEGER,

    CONSTRAINT "stations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."publicStations" (
    "id" SERIAL NOT NULL,
    "stationId" INTEGER NOT NULL,
    "providerId" INTEGER,

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
CREATE TABLE "public"."chargeConnectors" (
    "id" SERIAL NOT NULL,
    "dc" BOOLEAN NOT NULL,
    "name" TEXT,
    "stationId" INTEGER NOT NULL,

    CONSTRAINT "chargeConnectors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."chargeTariffs" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "validFrom" TIMESTAMP(3) NOT NULL,
    "validTo" TIMESTAMP(3),
    "connectorId" INTEGER NOT NULL,

    CONSTRAINT "chargeTariffs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."chargeTariffTimes" (
    "id" SERIAL NOT NULL,
    "days" INTEGER[],
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "tariffId" INTEGER NOT NULL,

    CONSTRAINT "chargeTariffTimes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."providers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_PublicStationToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PublicStationToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "chargeSession_invoiceId_key" ON "public"."chargeSession"("invoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "publicStations_stationId_key" ON "public"."publicStations"("stationId");

-- CreateIndex
CREATE UNIQUE INDEX "privateStations_stationId_key" ON "public"."privateStations"("stationId");

-- CreateIndex
CREATE INDEX "_PublicStationToUser_B_index" ON "public"."_PublicStationToUser"("B");

-- AddForeignKey
ALTER TABLE "public"."files" ADD CONSTRAINT "files_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."chargeSession" ADD CONSTRAINT "chargeSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chargeSession" ADD CONSTRAINT "chargeSession_connectorId_fkey" FOREIGN KEY ("connectorId") REFERENCES "public"."chargeConnectors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chargeSession" ADD CONSTRAINT "chargeSession_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "public"."providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chargeSession" ADD CONSTRAINT "chargeSession_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "public"."files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."publicStations" ADD CONSTRAINT "publicStations_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "public"."stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."publicStations" ADD CONSTRAINT "publicStations_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "public"."providers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."privateStations" ADD CONSTRAINT "privateStations_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "public"."stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."privateStations" ADD CONSTRAINT "privateStations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chargeConnectors" ADD CONSTRAINT "chargeConnectors_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "public"."stations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chargeTariffs" ADD CONSTRAINT "chargeTariffs_connectorId_fkey" FOREIGN KEY ("connectorId") REFERENCES "public"."chargeConnectors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chargeTariffTimes" ADD CONSTRAINT "chargeTariffTimes_tariffId_fkey" FOREIGN KEY ("tariffId") REFERENCES "public"."chargeTariffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PublicStationToUser" ADD CONSTRAINT "_PublicStationToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."publicStations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PublicStationToUser" ADD CONSTRAINT "_PublicStationToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
