import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) {
      throw new UnauthorizedException('Usuário não autenticado');
    }
    return data ? request.user[data] : request.user;
  },
);
