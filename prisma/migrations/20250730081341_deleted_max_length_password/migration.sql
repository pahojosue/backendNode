/*
  Warnings:

  - You are about to alter the column `password` on the `utilisateurs` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `utilisateurs` MODIFY `password` VARCHAR(191) NOT NULL;
