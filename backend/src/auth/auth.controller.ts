//path: backend/src/auth/auth.controller.ts

import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto } from "./dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  //Rotas de autenticação
  @Post("signup")
  singup(@Body() dto: RegisterDto) {
    
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("signin")
  singin(@Body() dto: LoginDto) {
    return this.authService.signin(dto);
  }
}
