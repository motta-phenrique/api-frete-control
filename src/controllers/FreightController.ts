import { Request, Response } from "express";
import { FreightService } from "../services/FreightService";
import { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: JwtPayload | string;
}

export class FreightController {
  freightService: FreightService;

  constructor(freightService = new FreightService()) {
    this.freightService = freightService;
  }

  getFreights = async (request: CustomRequest, response: Response) => {
    const { userId } = request.body
    try {
      const data = await this.freightService.getFreights(userId)

      response.status(200).send(data)
    } catch (error: any) {
      switch (error.message) {
        case "Id obrigatório":
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
  }

  getOneFreight = async (request: Request, response: Response) => {
    const { id, userId } = request.body
    try {
      const data = await this.freightService.getOneFreight(id, userId)

      response.status(200).send(data)
    } catch (error: any) {
      switch (error.message) {
        case "Id obrigatório":
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
  }

  createFreight = async (request: Request, response: Response) => {
    const { client, value, date, starting, destination, userId } = request.body;

    try {
      const data = await this.freightService.createFreight(
        client,
        value,
        date,
        starting,
        destination,
        userId
      );

      const { id } = data;

      response.status(201).send({
        id,
      });
    } catch (error: any) {
      switch (error.message) {
        case "Todos os campos são obrigatórios":
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

  deleteFreight = async (request: Request, response: Response) => {
    const { id } = request.body;

    try {
      const data = await this.freightService.deleteFreight(id);

      if (!data) {
        response.status(400).send({
          message: "Erro ao excluir frete",
        });
        return;
      }

      response.status(200).send({
        id: data.id,
      });
    } catch (error: any) {
      switch (error.message) {
        case "Todos os campos são obrigatórios":
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

  updateOneFreight = async (request: Request, response: Response) => {
    const { id, userId, client, value, destination, starting, date } = request.body;

    try {
      const data = await this.freightService.updadteFreight(id, userId, client, value, destination, starting, date);

      if (!data) {
        response.status(400).send({
          message: "Erro ao excluir frete",
        });
        return;
      }

      response.status(200).send({
        data
      });
    } catch (error: any) {
      switch (error.message) {
        case "Todos os campos são obrigatórios":
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
  }

  updateFreightStatus = async (request: Request, response: Response) => {
    const { id, userId, status } = request.body

    try {
      const data = await this.freightService.updateFreightStatus(id, userId, status)

      if (!data) {
        response.status(400).send({
          message: "Erro ao excluir frete",
        });
        return;
      }

      response.status(200).send({
        data
      });
    } catch (error: any) {
      switch (error.message) {
        case "Todos os campos são obrigatórios":
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
  }
}
