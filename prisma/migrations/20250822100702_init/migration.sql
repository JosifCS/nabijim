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
CREATE TABLE "public"."chargeStations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "customName" TEXT,
    "providerId" INTEGER,
    "userId" INTEGER,
    "city" TEXT,
    "street" TEXT,
    "streetNumber" INTEGER,
    "houseNumber" INTEGER,

    CONSTRAINT "chargeStations_pkey" PRIMARY KEY ("id")
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

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "chargeSession_invoiceId_key" ON "public"."chargeSession"("invoiceId");

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
ALTER TABLE "public"."chargeStations" ADD CONSTRAINT "chargeStations_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "public"."providers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chargeStations" ADD CONSTRAINT "chargeStations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chargeConnectors" ADD CONSTRAINT "chargeConnectors_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "public"."chargeStations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chargeTariffs" ADD CONSTRAINT "chargeTariffs_connectorId_fkey" FOREIGN KEY ("connectorId") REFERENCES "public"."chargeConnectors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chargeTariffTimes" ADD CONSTRAINT "chargeTariffTimes_tariffId_fkey" FOREIGN KEY ("tariffId") REFERENCES "public"."chargeTariffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
