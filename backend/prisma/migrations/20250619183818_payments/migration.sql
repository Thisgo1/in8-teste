-- CreateEnum
CREATE TYPE "PaymentProvider" AS ENUM ('CREDIT_CARD', 'PIX', 'PAYPAL', 'BANK_SLIT');

-- CreateTable
CREATE TABLE "PaymentMethods" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "provider" "PaymentProvider" NOT NULL,
    "last4Digits" TEXT,
    "brand" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isMock" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "PaymentMethods_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PaymentMethods" ADD CONSTRAINT "PaymentMethods_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
