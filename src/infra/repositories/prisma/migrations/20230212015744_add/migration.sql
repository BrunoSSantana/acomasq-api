/*
  Warnings:

  - A unique constraint covering the columns `[month,year,user_id]` on the table `payment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "payment_month_year_user_id_key" ON "payment"("month", "year", "user_id");
