import Fastify from 'fastify'
import autoload from "fastify-autoload"
import { join } from "path"
import prismaPlugin  from './plugins/prisma.js'

const app = Fastify({logger: true})

app.register(prismaPlugin)
app.register(autoload, { dir: join(import.meta.dirname, "routes")})
app.register(autoload, { dir: join(import.meta.dirname, "plugins")})

const start = async () => {
    try {
        await app.listen({port: 3000, host: "0.0.0.0" })
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}

start()