-- CreateTable
CREATE TABLE "DoctorChamber" (
    "id" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "phone" TEXT,
    "diagnosticId" TEXT,
    "doctorId" TEXT NOT NULL,

    CONSTRAINT "DoctorChamber_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DoctorChamber" ADD CONSTRAINT "DoctorChamber_diagnosticId_fkey" FOREIGN KEY ("diagnosticId") REFERENCES "Diagnostic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorChamber" ADD CONSTRAINT "DoctorChamber_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
