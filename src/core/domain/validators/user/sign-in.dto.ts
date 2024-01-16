import { IsString } from "class-validator"

export class SignInDTO {
  @IsString()
  public readonly email: string
  
  @IsString()
  public readonly password: string
}