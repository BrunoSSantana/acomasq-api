/*
  Warnings:

  - You are about to drop the column `ano` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `mes` on the `payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[month,year,associate_id]` on the table `payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `month` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "payment_mes_ano_associate_id_key";

-- AlterTable
ALTER TABLE "payment" DROP COLUMN "ano",
DROP COLUMN "mes",
ADD COLUMN     "month" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "payment_month_year_associate_id_key" ON "payment"("month", "year", "associate_id");
