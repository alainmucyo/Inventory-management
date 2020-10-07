import {Sequelize} from "sequelize";

export const database = new Sequelize(`${process.env.DB_TYPE}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:5432/${process.env.DB_DATABASE}`, {
    logging: false
})
