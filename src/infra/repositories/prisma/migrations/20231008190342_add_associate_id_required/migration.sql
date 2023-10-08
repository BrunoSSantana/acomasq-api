/*
  Warnings:

  - Made the column `associate_id` on table `payment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_associate_id_fkey";

-- AlterTable
ALTER TABLE "payment" ALTER COLUMN "associate_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_associate_id_fkey" FOREIGN KEY ("associate_id") REFERENCES "associate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
