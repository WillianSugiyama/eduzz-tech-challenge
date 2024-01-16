import { IsString } from "class-validator"

export class CreateUserDTO {
  @IsString()
  public readonly email: string

  @IsString()
  public readonly password: string

  @IsString()
  public readonly name: string
}