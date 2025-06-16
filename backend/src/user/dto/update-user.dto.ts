import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MinLength,
  MaxLength,
} from "class-validator";

export class UpdateUserDto {
  @IsEmail({}, { message: "E-mail inválido" })
  @IsOptional()
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: "Formato de e-mail inválido (exemplo: usuario@provedor.com)",
  })
  email?: string;

  @IsString()
  @IsOptional()
  @MinLength(2, { message: "Nome precisa ter pelo menos 2 caracteres" })
  @MaxLength(50, { message: "Nome não pode ultrapassar 50 caracteres" })
  @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, {
    message: "Nome deve conter apenas letras",
  })
  firstName?: string;

  @IsString()
  @IsOptional()
  @MinLength(2, { message: "Sobrenome precisa ter pelo menos 2 caracteres" })
  @MaxLength(50, { message: "Sobrenome não pode ultrapassar 50 caracteres" })
  @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, {
    message: "Sobrenome deve conter apenas letras",
  })
  lastName?: string;
}
