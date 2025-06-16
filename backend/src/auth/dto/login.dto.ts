import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from "class-validator";

export class LoginDto {
  @IsEmail(
    {},
    { message: "E-mail inválido, por favor insira um E-mail válido" },
  )
  @IsNotEmpty({ message: "Seu E-mail não pode estar vazio" })
  email: string;

  @IsString()
  @MinLength(8, { message: "Senha muito curta (mínimo 8 caracteres)" })
  @IsNotEmpty({ message: "Senha não pode estar vazia" })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message:
      "Senha precisa ter 8 caracteres, 1 letra maiúscula, 1 minúscula e 1 número",
  })
  password: string;
}
