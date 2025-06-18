import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getCurrentUser(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }
    return user;
  }

  async updateUser(userId: number, dto: UpdateUserDto) {
    if (!dto) {
      throw new BadRequestException("Nenhum dado fornecido para atualização");
    }
    if (dto.email) {
      //verifica se o novo email já não esta em uso por outra pessoa
      const emailExists = await this.prisma.user.findFirst({
        where: {
          email: dto.email,
          id: { not: userId },
        },
      });

      if (emailExists) {
        throw new ConflictException("Este e-mail já está em uso");
      }
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        ...dto,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async deleteUser(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    await this.prisma.user.delete({ where: { id: userId } });

    return { message: "Usuário deletado com sucesso" };
  }
}
