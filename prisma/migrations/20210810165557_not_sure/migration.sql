/*
  Warnings:

  - You are about to drop the column `time` on the `Appointment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "time",
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;
