import { Request } from "express"
import { jwtUser } from "./jwtUser-types"
export interface IGetUserAuthInfoRequest<T extends Request, U extends jwtUser> extends Request {
  body : T,
  jwtUser : U
}