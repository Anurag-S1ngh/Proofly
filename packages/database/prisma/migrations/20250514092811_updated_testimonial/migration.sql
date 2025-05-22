/*
  Warnings:

  - You are about to drop the column `projectId` on the `Testimonial` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `Testimonial` table. All the data in the column will be lost.
  - You are about to drop the column `userDesignation` on the `Testimonial` table. All the data in the column will be lost.
  - Added the required column `projectLinkId` to the `Testimonial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stars` to the `Testimonial` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Testimonial" DROP CONSTRAINT "Testimonial_projectId_fkey";

-- AlterTable
ALTER TABLE "Testimonial" DROP COLUMN "projectId",
DROP COLUMN "start",
DROP COLUMN "userDesignation",
ADD COLUMN     "projectLinkId" TEXT NOT NULL,
ADD COLUMN     "stars" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_projectLinkId_fkey" FOREIGN KEY ("projectLinkId") REFERENCES "Project"("linkId") ON DELETE RESTRICT ON UPDATE CASCADE;
