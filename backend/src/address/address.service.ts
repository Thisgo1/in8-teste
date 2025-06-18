import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { GetAddress } from "./decorator";
import { NewAddressDto } from "./dto";

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  async getAllUserAddresses(userId: number) {
    return this.prisma.address.findMany({
      where: { userId },
      select: {
        id: true,
        street: true,
        city: true,
        state: true,
        postalCode: true,
        complement: true,
        number: true,
        country: true,
        isDefault: true,
      },
    });
  }

  async getAddress(userId: number, addressId: number) {
    const address = await this.prisma.address.findFirst({
      where: { id: addressId, userId },
    });

    if (!address) {
      throw new NotFoundException("Endereço não encontrado");
    }

    return address;
  }

  async createAddress(userId: number, dto: NewAddressDto) {
    if (dto.isDefault) {
      await this.resetDefaultAddress(userId);
    }

    return this.prisma.address.create({
      data: { ...dto, user: { connect: { id: userId } } },
    });
  }

  async updateAddress(
    userId: number,
    addressId: number,
    dto: UpdateAddressDto,
  ) {
    await this.getAddress(userId, addressId);

    if (dto.isDefault) {
      await this.resetDefaultAddress(userId);
    }

    return this.prisma.address.update({
      where: { id: addressId },
      data: dto,
    });
  }

  async deleteAddress(userId: number, addressId: number) {
    await this.getAddress(userId, addressId);

    return this.prisma.address.delete({
      where: { id: addressId },
    });
  }

  private async resetDefaultAddress(userId: number) {
    await this.prisma.address.updateMany({
      where: { userId, isDefault: true },
      data: { isDefault: false },
    });
  }
}
