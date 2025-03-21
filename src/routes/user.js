import { prisma } from "../plugins/prisma.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export default async function (fastify, opts) {
  fastify.post("/auth/create-users", async (request, reply) => {
    const { email, name, password } = request.body;

    if (!email || !name || !password) {
      return reply
        .status(400)
        .send({ error: "Email, name, and password are required" });
    }

    try {
      const hashPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashPassword,
        },
      });

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "10h" }
      );

      return reply.status(201).send({ token });
    } catch (error) {
      return reply.status(500).send({ error: error.message });
    }
  });

  fastify.post("/auth/login", async (request, reply) => {
    console.log(request)
    const { email, password } = request.body;

    if (!email || !password) {
      return reply
        .status(400)
        .send({ error: "Email and password are required" });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return reply.status(400).send({ error: "Invalid email or password" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return reply.status(400).send({ error: "Invalid email or password" });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "10h" }
      );

      return reply.status(200).send({ token });
    } catch (error) {
      return reply.status(500).send({ error: error.message });
    }
  });
}
