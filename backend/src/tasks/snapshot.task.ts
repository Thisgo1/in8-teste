import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { PrismaService } from "nestjs-prisma";
import { ProvidersService } from "src/providers/providers.service";

@Injectable()
export class SnapshotTasks {
  private readonly logger = new Logger(SnapshotTasks.name);

  constructor(
    private prisma: PrismaService,
    private providersService: ProvidersService,
  ) {}

  @Cron(CronExpression.EVERY_WEEKEND)
  async updateOldSnapshots() {
    this.logger.log("Iniciando atualização de snapshots antigos..");

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const oldSnapshots = await this.prisma.productSnapshot.findMany({
      where: { updatedAt: { lt: thirtyDaysAgo } },
    });
    this.logger.log(
      `Encontrados ${oldSnapshots.length} snapshots para atualizar`,
    );
    for (const snapshot of oldSnapshots) {
      try {
        const current = await this.providersService.getProductById(
          snapshot.provider,
          snapshot.productId,
        );

        if (
          current.name !== snapshot.name ||
          current.price !== snapshot.price ||
          current.description !== snapshot.description ||
          current.image !== snapshot.imageUrl
        ) {
          await this.prisma.productSnapshot.update({
            where: { id: snapshot.id },
            data: {
              name: current.name,
              price: current.price,
              description: current.description,
              imageUrl: current.image,
              updatedAt: new Date(),
            },
          });
          this.logger.debug(`Snapshot ${snapshot.id} atualizado`);
        }
      } catch (error) {
        this.logger.warn(
          `Falha ao atualizar snapshot ${snapshot.id}: ${error.message}`,
        );

        await this.prisma.productSnapshot.update({
          where: { id: snapshot.id },
          data: {
            description: "Produto descontinuado",
            updatedAt: new Date(),
          },
        });
      }
    }

    this.logger.log("Atualização de snapshots concluída");
  }
}
