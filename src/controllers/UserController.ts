import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  userService: UserService;

  constructor(userService = new UserService()) {
    this.userService = userService;
  }

  createUser = async (request: Request, response: Response) => {
    const { email, name, password } = request.body;
    try {
      const data = await this.userService.createUser(name, email, password);
      response.status(201).send(data);
      return;
    } catch (error: any) {
      switch (error.message) {
        case "Email já existe":
          response.status(409).send({
            message: error.message,
          });
          return;

        case "Email, nome e senha obrigatórios":
          response.status(400).send({
            message: error.message,
          });
          return;

        default:
          response.status(500).send({
            message: "Erro de servidor",
          });
          return;
      }
    }
  };

  loginUser = async (request: Request, response: Response) => {
    const { email, password } = request.body;

    try {
      const data = await this.userService.loginUser(email, password);

      if (!data.token || !data.sendUser) {
        response.status(400).send({
          message: "erro ao gerar token",
        });
        return;
      }

      const { sendUser, token } = data;

      response.status(200).send({
        sendUser,
        token,
      });
    } catch (error: any) {
      switch (error.message) {
        case "Email e senha obrigatórios":
          response.status(400).send({
            message: error.message,
          });
          return;
        case "Email ou senha inválidos":
          response.status(401).send({
            message: error.message,
          });
          return;
        default:
          response.status(500).send({
            message: "Erro de servidor",
          });
          return;
      }
    }
  };

  recoveryPassword = async (request: Request, response: Response) => {
    const { email } = request.body;

    try {
      await this.userService.recoveryPassword(email);

      response.status(200).json({
        message: "E-mail enviado com sucesso",
      });
    } catch (error) {
      response.status(400).json({ error: (error as Error).message });
      return;
    }
  };

  verifyOtp = async (request: Request, response: Response) => {

    const { email, otp } = request.body;

    if (!email || !otp) {
      response.status(400).json({
        message: "Dados obrigatórios",
      });
    }

    try {
      await this.userService.verfyOtp(email, otp);

      response.status(200).json({
        message: "Codigo verificado com sucesso",
      });
    } catch (error) {
      response.status(400).json({
        error: (error as Error).message,
      });
    }
  };

  createNewPassword = async (request: Request, response: Response) => {
    const { email, newPassword } = request.body;
    try {
      await this.userService.createNewPassword(email, newPassword);

      response.status(200).json({
        message: "Senha alterada com sucesso",
      });
    } catch (error) {
      response.status(400).json({
        error: (error as Error).message,
      });
    }
  };
}
