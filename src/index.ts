import express from 'express'
import { router } from './route'
import cors from "cors"
import dotenv from "dotenv";


dotenv.config();
const server = express()
server.use(cors());

server.use(express.json())
server.use(router)

server.listen(8000, '0.0.0.0', () => console.log("rodando"))