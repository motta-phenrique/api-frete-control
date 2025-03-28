import prisma from "../plugins/prisma";

export class ExpensesService {
  createExpenses = async (name: string, value: number, freightId: string) => {
    try {
      if (!name && !value && !freightId) {
        throw { message: "Todos os campos são obrigatórios" };
      }

      const data = await prisma.expenses.create({
        data: {
          name,
          value,
          freightId,
        },
      });

      return data;
    } catch (error: any) {
      throw {
        message: error.message,
      };
    }
  };

  deleteExpenses = async (id: string) => {
    try {
      if (!id) {
        throw { message: "Id obrigatório" };
      }

      const data = await prisma.expenses.delete({
        where: {
          id,
        },
      });

      return data;
    } catch (error: any) {
      throw {
        message: error.message,
      };
    }
  };
}
