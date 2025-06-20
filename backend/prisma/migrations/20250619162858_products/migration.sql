-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "isDefault" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "addressId" INTEGER;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "description" TEXT,
ADD COLUMN     "discount" DOUBLE PRECISION DEFAULT 0.0,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "notes" TEXT;

-- CreateIndex
CREATE INDEX "OrderItem_productId_idx" ON "OrderItem"("productId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
