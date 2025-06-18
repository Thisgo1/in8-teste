import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';


@Injectable()
export class AddressDecorator {
  constructor(private prisma: PrismaService) {}

  async getAddress(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;
    const addressId = parseInt(request.params.id, 10);

    const address = await this.prisma.address.findFirst({
      where: { id: addressId, userId },
    });

    if (!address) {
      throw new NotFoundException('Endereço não encontrado');
    }

    return address;
  }
}

// Factory function para o decorator
export const GetAddress = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const addressDecorator = request.addressDecorator as AddressDecorator;
    return addressDecorator.getAddress(ctx);
  }
);
