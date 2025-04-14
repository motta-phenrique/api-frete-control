import prisma from "../plugins/prisma";
import { Status } from "../types/types";

export class FreightService {
  getFreights = async (id: string) => {
    try {
      if(!id) {
        throw {message : "Id obrigatório"}
      }

      const data = await prisma.freight.findMany({
        where: {
          userId: id
        },
        include: {
          expenses: true
        }
      })

      return data
    } catch (error: any) {
      throw {
        message: error.message,
      };
    }
  }

  getOneFreight = async (id: string, userId: string,) =>{
    try {
        if(!userId || !id){
          throw {message : "Id obrigatório"}
        }

        const data = await prisma.freight.findUnique({
          where: {
            id,
            userId
          },
          include: {
            expenses: true
          }
        })

        return data
    } catch (error : any) {
      throw {
        message: error.message,
      };
    }
  }

  createFreight = async (
    client: string,
    value: number,
    date: Date,
    starting: string,
    destination: string,
    userId: string
  ) => {
    try {
      if (!client && !value && !date && !starting && !destination && !userId) {
        throw { message: "Todos os campos são obrigatórios" };
      }

      const freight = await prisma.freight.create({
        data: {
          client,
          value,
          date,
          destination,
          starting,
          userId,
        },
      });

      return freight;
    } catch (error: any) {
      throw {
        message: error.message,
      };
    }
  };

  deleteFreight = async (id: string) => {
    try {
      if (!id) {
        throw { message: "Id obrigatório" };
      }

      const data = await prisma.freight.delete({
        where: {
          id,
        },
      });

      return data
    } catch (error: any) {
      throw {
        message: error.message,
      };
    }
  };

  updadteFreight = async (id: string, userId: string, client: string, value: number, destination: string, starting: string, date: Date) => {
    try {
      if (!id) {
        throw { message: "Id obrigatório" };
      }

      const data = await prisma.freight.update({
        where: {
          id: id,
          userId: userId
        },
        data: {
          client,
          value,
          destination,
          starting,
          date
        }
      })

      return data
    } catch(error: any) {
      throw {
        message: error.message,
      };
    }
  }

  updateFreightStatus = async (id: string, userId: string, status: Status) => {
    try {
      if (!id && !userId && !status) {
        throw { message: "Todos os campos são obrigatórios" };
      }

      let updateStatus: Status | null = null

      if(status === "PENDING"){
        updateStatus = "ACTIVATE"
      }else {
        updateStatus = "FINISHED"
      }

      const data = await prisma.freight.update({
        where: {
          id: id,
          userId: userId
        },
        data: {
          status: status === "PENDING" ? "ACTIVATE" : "FINISHED"
        }
      })

      return data
    }catch(error: any){
      throw {
        message: error.message,
      };
    }
  }

  getFreightDashboardDetails = async (id: string) => {
    try {
      if (!id) {
        throw { message: "Todos os campos são obrigatórios" };
      }

      const response = await prisma.freight.findMany({
        where: {
          userId: id
        },
        include: {
          expenses: true
        }
      })
      let profit = 0
      let expenses = 0
      let count = response.length
      response.map((freight) => {
        profit += Number(freight.value)

        if(freight.expenses.length > 0){
          freight.expenses.map((ex) => {
            expenses += Number(ex.value) 
          })
        }
      })

      const data = {
        profit: profit.toFixed(2),
        expenses: expenses.toFixed(2),
        liquid: (profit - expenses).toFixed(2),
        count
      }

      return data 
    } catch (error: any) {
      throw {
        message: error.message,
      };
    }
  }
}
