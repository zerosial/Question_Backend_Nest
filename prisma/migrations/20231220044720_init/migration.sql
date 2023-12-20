-- CreateEnum
CREATE TYPE "QuestionCategory" AS ENUM ('MEMBER_INFO', 'CAR_SHARING', 'VEHICLE_CONTROL', 'OTHER');

-- CreateEnum
CREATE TYPE "QuestionDetail" AS ENUM ('PERSONAL_INFO_CHANGE', 'AFFILIATION_CHANGE', 'LICENSE_CARD_REGISTRATION', 'OTHER_MEMBER_INFO', 'RESERVATION_INQUIRY', 'RETURN_INQUIRY', 'PAYMENT_INQUIRY', 'DOOR_CONTROL_INQUIRY', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inquiry" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "questionTypeId" INTEGER NOT NULL,
    "questionCategory" TEXT NOT NULL,
    "questionDetail" TEXT NOT NULL,
    "registeredDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "questionState" TEXT NOT NULL DEFAULT 'N',
    "answerRegisteredDate" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "QuestionType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_questionTypeId_fkey" FOREIGN KEY ("questionTypeId") REFERENCES "QuestionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
