const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    db_name: process.env.DB_NAME,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
    db_dialect: process.env.DB_DIALECT,
    secret_key: process.env.SECRET_KEY,
}