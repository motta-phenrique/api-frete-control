import { Request, Response } from "express";
import { ExpensesService } from "../services/ExpensesServices";
import { CustomRequest } from "./FreightController";

export class ExpensesController {
  expensesServices: ExpensesService;

  constructor(expensesServices = new ExpensesService()) {
    this.expensesServices = expensesServices;
  }

  createExpenses = async (request: CustomRequest, response: Response) => {
    const { name, value, freightId } = request.body;

    try {
      const data = await this.expensesServices.createExpenses(
        name,
        value,
        freightId
      );
      if (!data) {
        response.status(400).send({
          message: "Erro ao criar despesa",
        });
        return;
      }

      response.status(201).send({
        data,
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

  deleteExpenses = async (request: Request, response: Response) => {
    const { id } = request.body;
    try {
      const data = await this.expensesServices.deleteExpenses(id);

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
}
