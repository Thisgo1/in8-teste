import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProvidersModule } from "src/providers/providers.module";
import { ProductsService } from "./products.service";
import { PrismaModule } from "nestjs-prisma";
import { ProductSnapshotService } from "./product-snapshot.service";
import { SnapshotTasks } from "src/tasks/snapshot.task";

@Module({
  imports: [ProvidersModule, PrismaModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductSnapshotService, SnapshotTasks],
})
export class ProductsModule {}
