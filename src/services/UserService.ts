import prisma from "../plugins/prisma";
import bcrypt from "bcrypt";
import { hashPassword } from "../utils/hashPassword";
import jwt from "jsonwebtoken";
import { generateOtpCode } from "../utils/generateOtp";
import { MailgunService } from "./MailgunService";

export class UserService {
  mailgunService: MailgunService;

  constructor(mailgunService = new MailgunService()) {
    this.mailgunService = mailgunService;
  }

  createUser = async (name: string, email: string, password: string) => {
    try {
      if (!name || !email || !password) {
        throw { message: "Email, nome e senha obrigatórios" };
      }

      const verifyEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (verifyEmail) {
        throw { message: "Email já existe" };
      }

      const hashedPassword = await hashPassword(password);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      return user;
    } catch (error: any) {
      throw {
        message: error.message,
      };
    }
  };

  loginUser = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        throw { message: "Email e senha obrigatórios" };
      }

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw { message: "Email ou senha inválidos" };
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw { message: "Email ou senha inválidos" };
      }

      const sendUser = {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
      };

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "5h" }
      );

      return {
        token,
        sendUser,
      };
    } catch (error: any) {
      throw { message: error.message };
    }
  };

  recoveryPassword = async (email: string) => {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }
    try {
      const code = generateOtpCode();

      const expireAt = new Date(Date.now() + 5 * 60 * 1000);

      await prisma.passwordResetToken.create({
        data: {
          code,
          expireAt,
          userId: user.id,
        },
      });
      await this.mailgunService.sendOtpEmail(email, code);
    } catch (error: any) {
      throw { message: error.message };
    }
  };

  verfyOtp = async (email: string, code: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) throw new Error("Usuário não encontrado.");

      const lastOtp = await prisma.passwordResetToken.findFirst({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
      });

      if (!lastOtp || lastOtp.code !== code)
        throw new Error("Código inválido.");
      if (lastOtp.expireAt < new Date()) throw new Error("Código expirado.");

      await prisma.passwordResetToken.update({
        where: { id: lastOtp.id },
        data: { validated: true },
      });
    } catch (error: any) {
      throw { message: error.message };
    }
  };

  createNewPassword = async (email: string, newPassword: string) => {
    try {
      const user = await prisma.user.findUnique({ where: { email } })
      if (!user) throw new Error("Usuário não encontrado.");


      const otp = await prisma.passwordResetToken.findFirst({
        where: {
          userId: user.id,
          validated: true 
        }, 
        orderBy: { createdAt: "desc" }
      })

      if (!otp) throw new Error("Código ainda não foi validado.");

      const hashedPassword = await hashPassword(newPassword)

      await prisma.user.update({
        where: {id: user.id},
        data: {
          password: hashedPassword
        }
      })

      await prisma.passwordResetToken.delete({where: {id: otp.id}})
    } catch (error: any) {
      throw { message: error.message };
    }
  }
}
