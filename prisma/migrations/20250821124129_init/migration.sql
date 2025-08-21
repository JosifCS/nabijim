-- CreateTable
CREATE TABLE "public"."users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(100),
    "lastName" VARCHAR(100),

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
    "UserId" INTEGER NOT NULL,
    "stationId" INTEGER NOT NULL,
    "providerId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "extraFees" DOUBLE PRECISION NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "kwh" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "dc" BOOLEAN NOT NULL,
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
ALTER TABLE "public"."chargeSession" ADD CONSTRAINT "chargeSession_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chargeSession" ADD CONSTRAINT "chargeSession_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "public"."chargeStations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chargeSession" ADD CONSTRAINT "chargeSession_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "public"."providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chargeSession" ADD CONSTRAINT "chargeSession_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "public"."files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chargeStations" ADD CONSTRAINT "chargeStations_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "public"."providers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chargeStations" ADD CONSTRAINT "chargeStations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
