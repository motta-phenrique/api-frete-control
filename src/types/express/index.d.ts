import { JwtPayload } from "jsonwebtoken";

declare namespace Express {
  export interface Request {
    user?: string // ou ajuste conforme seu token
  }
}
