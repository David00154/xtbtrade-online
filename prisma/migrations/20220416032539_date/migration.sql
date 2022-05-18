/*
  Warnings:

  - Added the required column `date` to the `latest-transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "latest-transactions" ADD COLUMN     "date" TEXT NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;
