/*
  Warnings:

  - A unique constraint covering the columns `[videoURL]` on the table `Testimonial` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Testimonial" ADD COLUMN     "videoURL" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Testimonial_videoURL_key" ON "Testimonial"("videoURL");
