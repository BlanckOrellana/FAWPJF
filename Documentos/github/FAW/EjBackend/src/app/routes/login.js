conn = require('../../config/database');

module.exports = (app) => {
    app.post('/login', (req, res) => {
        let query = `SELECT * FROM usuario 
                     WHERE email = '${req.body.email}' AND password = '${req.body.password}'`;
        conn.query(query, (err, rows, cols) => {
            if (err) {
                res.json({status: 0, mensaje: "Error en el servidor"});
            } else if (rows.length == 0) {
                res.json({status: 0, mensaje: "No se encontro el usuario"});
            } else {
                res.json({status: 1, mensaje: "usuario autenticado.", usuario: rows[0]});
            }
        });             
    });
}