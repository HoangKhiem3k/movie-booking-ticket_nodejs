const { Sequelize } = require("sequelize");
const config = require("../configs/index")


const sequelize = new Sequelize(config.db_name, config.db_user, config.db_password, {
    host: config.db_host,
    port: config.db_port,
    dialect: config.db_dialect
})
module.exports = sequelize

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
// Tạo models tự động theo mysql:
//yarn equelize-auto -h <host(localhost)> -d <database(db_order)> -u <user(root)> -x [password(1234)] -p [port(3307)]  --dialect [dialect(mysql)] -o [/path/to/models] -l es6
//yarn sequelize-auto -h localhost -d db_order -u root -x 1234 -p 3307  --dialect mysql -o "./models" -l es6

//yarn sequelize-auto -h localhost -d movie -u root -x 1234 -p 3306 --dialec mysql -l es6