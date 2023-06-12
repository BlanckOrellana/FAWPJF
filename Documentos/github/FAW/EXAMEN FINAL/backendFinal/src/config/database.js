const mysql = require("mysql");
const conn = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "123456",
        database: "Final"
    }
);

conn.connect(err => {
    if(err) {
        console.log("coneccion fallida al servidor" + err);
    } else {
        console.log("coneccion exitosa a la base de datos");
    }
});

module.exports = conn;