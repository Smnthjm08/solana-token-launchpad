/*
  Warnings:

  - The primary key for the `challenge_participants` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `challenge_participants` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `challenges` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `challenges` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `challengeId` on the `challenge_participants` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "challenge_participants" DROP CONSTRAINT "challenge_participants_challengeId_fkey";

-- AlterTable
ALTER TABLE "challenge_participants" DROP CONSTRAINT "challenge_participants_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "challengeId",
ADD COLUMN     "challengeId" INTEGER NOT NULL,
ADD CONSTRAINT "challenge_participants_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "challenges" DROP CONSTRAINT "challenges_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "challenges_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "challenge_participants" ADD CONSTRAINT "challenge_participants_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
