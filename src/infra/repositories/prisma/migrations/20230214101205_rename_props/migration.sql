/*
  Warnings:

  - You are about to drop the column `month` on the `pagamento` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `pagamento` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `pagamento` table. All the data in the column will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[mes,ano,associado_id]` on the table `pagamento` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ano` to the `pagamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mes` to the `pagamento` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pagamento" DROP CONSTRAINT "pagamento_user_id_fkey";

-- DropIndex
DROP INDEX "pagamento_month_year_user_id_key";

-- AlterTable
ALTER TABLE "pagamento" DROP COLUMN "month",
DROP COLUMN "user_id",
DROP COLUMN "year",
ADD COLUMN     "ano" INTEGER NOT NULL,
ADD COLUMN     "associado_id" UUID,
ADD COLUMN     "mes" INTEGER NOT NULL;

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "associado" (
    "id" UUID NOT NULL,
    "uid" TEXT,
    "name" TEXT,
    "cpf" TEXT,
    "rg" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "associado_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pagamento_mes_ano_associado_id_key" ON "pagamento"("mes", "ano", "associado_id");

-- AddForeignKey
ALTER TABLE "pagamento" ADD CONSTRAINT "pagamento_associado_id_fkey" FOREIGN KEY ("associado_id") REFERENCES "associado"("id") ON DELETE SET NULL ON UPDATE CASCADE;
