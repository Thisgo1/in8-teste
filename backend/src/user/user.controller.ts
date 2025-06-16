import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  UseGuards,
} from "@nestjs/common";
import { GetUser } from "src/auth/decorator";
import { JwtGuard } from "src/auth/guard";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";

@UseGuards(JwtGuard)
@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}
  @Get("me")
  getCurrentUser(@GetUser("id") userId: number) {
    return this.userService.getCurrentUser(userId);
  }

  @Patch()
  updateUser(@GetUser("id") userId: number, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(userId, dto);
  }

  @Delete()
  deleteUser(@GetUser("id") userId: number) {
    return this.userService.deleteUser(userId);
  }
}
