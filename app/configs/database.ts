import { knex } from "knex"
import { config } from 'dotenv'
config()

const db = knex({
  debug: process.env.DB_DEBUG === 'true' ? true : false,
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT ?? "5432"),
    database: process.env.DB_NAME
  }
})

export { db }