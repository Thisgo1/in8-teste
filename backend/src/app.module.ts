import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { BookmarkModule } from "./bookmark/bookmark.module";
import { ConfigModule } from "@nestjs/config";
import { AddressModule } from "./address/address.module";
import { ProvidersModule } from "./providers/providers.module";
import { OrderModule } from "./order/order.module";
import { ProductsModule } from "./products/products.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
    BookmarkModule,
    AddressModule,
    ProvidersModule,
    OrderModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
