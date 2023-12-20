/*
  Warnings:

  - You are about to drop the column `questionTypeId` on the `Inquiry` table. All the data in the column will be lost.
  - You are about to drop the `QuestionType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Inquiry" DROP CONSTRAINT "Inquiry_questionTypeId_fkey";

-- AlterTable
ALTER TABLE "Inquiry" DROP COLUMN "questionTypeId";

-- DropTable
DROP TABLE "QuestionType";
