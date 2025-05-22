/*
  Warnings:

  - You are about to drop the column `link` on the `Project` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[projectName]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[linkId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `linkId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectName` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Project_link_key";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "link",
ADD COLUMN     "linkId" TEXT NOT NULL,
ADD COLUMN     "projectName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Project_projectName_key" ON "Project"("projectName");

-- CreateIndex
CREATE UNIQUE INDEX "Project_linkId_key" ON "Project"("linkId");
