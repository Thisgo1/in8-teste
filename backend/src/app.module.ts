import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { AuthService } from "./auth/auth.service";
import { AuthController } from "./auth/auth.controller";
import { UserModule } from "./user/user.module";
import { BookmarkModule } from "./bookmark/bookmark.module";
import { ConfigModule } from "@nestjs/config";
import { AddressController } from "./address/address.controller";
import { AddressService } from "./address/address.service";
import { AddressModule } from "./address/address.module";
import { ProductsModule } from "./products/products.module";
import { ProvidersModule } from "./providers/providers.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
    AddressModule,
    BookmarkModule,
    AddressModule,
    ProductsModule,
    ProvidersModule,
  ],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AppModule {}
