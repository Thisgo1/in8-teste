import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { AddressService } from "./address.service";
import { GetAddress } from "./decorator";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { JwtGuard } from "src/auth/guard";
import { NewAddressDto } from "./dto";
import { GetUser } from "src/auth/decorator";

@UseGuards(JwtGuard)
@Controller("addresses")
export class AddressController {
  constructor(private AddressService: AddressService) {}
  @Get(':id')
  getAddress(@GetUser('id') userId: number , @Param('id') addressId: number) {
    return this.AddressService.getAddress(addressId, userId);
  }

  @Get()
  getAllUserAddresses(@GetUser('id') userId: number) {
    return this.AddressService.getAllUserAddresses(userId);
  }

  @Post()
  createAddress(@GetUser('id') userId: number,@Body() dto: NewAddressDto) {
    return this.AddressService.createAddress(userId, dto);
  }

  @Put(':id')
  updateAddress(@GetUser('id') userId: number, @Body() dto: UpdateAddressDto, addressId: number) {
    return this.AddressService.updateAddress(userId, addressId, dto);
  }

  @Delete(':id')
  deleteAddress(@GetAddress('id') userId: number, addressId: number) {
    return this.AddressService.deleteAddress(userId, addressId);
  }
}
