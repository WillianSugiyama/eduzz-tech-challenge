
import { HttpException } from "./http-exception";
 
export class WrongAuthenticationTokenException extends HttpException {
  constructor() {
    super(403, `Invalid Token`);
  }
}
 