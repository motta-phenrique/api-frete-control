import prisma from "../plugins/prisma";
import bcrypt from 'bcrypt';
import { hashPassword } from "../utils/hashPassword";
import jwt from "jsonwebtoken"

export class UserService {
  createUser = async (name: string, email: string, password: string) => {
    try {

      if(!name || !email || !password){
        throw { message : "Email, nome e senha obrigatórios" }
      }

      const verifyEmail = await prisma.user.findUnique({
        where: {
          email
        }
      })

      if(verifyEmail){
        throw { message : "Email já existe" }
      }

      const hashedPassword = await hashPassword(password)
   
      const response = await prisma.user.create({
        data: {
          name, 
          email,
          password: hashedPassword
        }
      })

      return response
    } catch (error: any) {
      throw {
        message : error.message
      }
    }
       
  };

  loginUser = async (email: string, password: string) => {
    try {
      if(!email || !password){
        throw {message : "Email e senha obrigatórios"}
      }

      const user = await prisma.user.findUnique({
        where : {
          email
        }
      })

      if(!user) {
        throw { message : "Email ou senha inválidos"}
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      

      if(!isValidPassword) {
        throw { message : "Email ou senha inválidos"}
      }

      const token = jwt.sign(
        {userId: user.id, email: user.email},
        process.env.JWT_SECRET as string,
        {expiresIn: '5h'}
      )

      return token
    } catch (error: any) {
      throw {message : error.message}
    }
  }
}
