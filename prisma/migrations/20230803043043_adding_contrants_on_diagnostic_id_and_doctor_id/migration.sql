/*
  Warnings:

  - A unique constraint covering the columns `[diagnosticId,doctorId]` on the table `DoctorChamber` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Bill" ALTER COLUMN "pcName" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "DoctorChamber_diagnosticId_doctorId_key" ON "DoctorChamber"("diagnosticId", "doctorId");
