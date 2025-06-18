/*
  Warnings:

  - Added the required column `complement` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "complement" TEXT NOT NULL,
ADD COLUMN     "number" INTEGER NOT NULL;
