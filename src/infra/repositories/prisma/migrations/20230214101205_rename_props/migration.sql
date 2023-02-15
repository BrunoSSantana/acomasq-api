/*
 Warnings:
 
 - You are about to drop the column `month` on the `payment` table. All the data in the column will be lost.
 - You are about to drop the column `user_id` on the `payment` table. All the data in the column will be lost.
 - You are about to drop the column `year` on the `payment` table. All the data in the column will be lost.
 - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
 - A unique constraint covering the columns `[mes,ano,associate_id]` on the table `payment` will be added. If there are existing duplicate values, this will fail.
 - Added the required column `ano` to the `payment` table without a default value. This is not possible if the table is not empty.
 - Added the required column `mes` to the `payment` table without a default value. This is not possible if the table is not empty.
 
 */
-- DropForeignKey
ALTER TABLE
  "payment" DROP CONSTRAINT "payment_user_id_fkey";

-- DropIndex
DROP INDEX "payment_month_year_user_id_key";

-- AlterTable
ALTER TABLE
  "payment" DROP COLUMN "month",
  DROP COLUMN "user_id",
  DROP COLUMN "year",
ADD
  COLUMN "ano" INTEGER NOT NULL,
ADD
  COLUMN "associate_id" UUID,
ADD
  COLUMN "mes" INTEGER NOT NULL;

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "associate" (
  "id" UUID NOT NULL,
  "uid" TEXT,
  "name" TEXT,
  "cpf" TEXT,
  "rg" TEXT,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "associate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payment_mes_ano_associate_id_key" ON "payment"("mes", "ano", "associate_id");

-- AddForeignKey
ALTER TABLE
  "payment"
ADD
  CONSTRAINT "payment_associate_id_fkey" FOREIGN KEY ("associate_id") REFERENCES "associate"("id") ON DELETE
SET
  NULL ON UPDATE CASCADE;