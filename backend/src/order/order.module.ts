import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { ProvidersModule } from "src/providers/providers.module";
import { PrismaModule } from "nestjs-prisma";

@Module({
  imports: [ProvidersModule, PrismaModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
