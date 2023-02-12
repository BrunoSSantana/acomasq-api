/*
  Warnings:

  - A unique constraint covering the columns `[month,year,user_id]` on the table `pagamento` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "pagamento_month_year_user_id_key" ON "pagamento"("month", "year", "user_id");
