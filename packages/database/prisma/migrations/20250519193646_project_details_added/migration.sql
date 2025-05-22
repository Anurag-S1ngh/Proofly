/*
  Warnings:

  - Added the required column `question` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testimonialDescription` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testimonialTitle` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "question" TEXT NOT NULL,
ADD COLUMN     "testimonialDescription" TEXT NOT NULL,
ADD COLUMN     "testimonialTitle" TEXT NOT NULL;
