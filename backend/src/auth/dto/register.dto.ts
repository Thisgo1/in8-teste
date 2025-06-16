import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from "class-validator";

export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: "Seu nome não pode estar vazio" })
  @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, {
    message: "Nome deve conter apenas letras",
  })
  firstName: string;

  @IsString()
  @IsOptional()
  @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, {
    message: "Sobrenome deve conter apenas letras",
  })
  lastName?: string;

  @IsEmail({}, { message: "E-mail inválido, insira um E-mail válido" })
  @IsNotEmpty({ message: "Seu E-mail não pode estar vazio" })
  email: string;

  @IsString()
  @MinLength(8, { message: "Senha muito curta (mínimo 8 caracteres)" })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message:
      "Senha precisa ter 8 caracteres, 1 letra maiúscula, 1 minúscula e 1 número",
  })
  @IsNotEmpty()
  password: string;
}
