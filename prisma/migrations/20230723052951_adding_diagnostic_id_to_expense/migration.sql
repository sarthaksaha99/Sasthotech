/*
  Warnings:

  - Added the required column `diagnosticId` to the `DailyExpense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DailyExpense" ADD COLUMN     "diagnosticId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "DailyExpense" ADD CONSTRAINT "DailyExpense_diagnosticId_fkey" FOREIGN KEY ("diagnosticId") REFERENCES "Diagnostic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
