import { Sequelize } from "sequelize-typescript"
import { Character } from "../../models/character.model"

//TODO: Create environment variables for database configuration
const DATABASE_CONFIG = {

}

export const sequelize = new Sequelize({
  dialect: "sqlite",
  host: "localhost",
  port: 3306,
  database: "rick-morty-api",
  username: "root",
  password: "password",
  models: [Character],
  logging: false,
})