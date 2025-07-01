-- CreateEnum
CREATE TYPE "Type" AS ENUM ('video', 'text');

-- AlterTable
ALTER TABLE "Testimonial" ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'text';
