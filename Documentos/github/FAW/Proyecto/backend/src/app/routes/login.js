conn = require('../../config/database');

module.exports = (app) => {
    //LOGIN REQUEST
    app.post('/login', (req, res) => {
        let query = `SELECT * FROM usuario 
                     WHERE usuario = '${req.body.usuario}' AND password = '${req.body.password}'`;
        conn.query(query, (err, rows, cols) => {
            if (err) {
                res.json({status: 0, mensaje: "Error en el servidor"});
            } else if (rows.length == 0) {
                res.json({status: 0, mensaje: "No se encontro el usuario"});
            } else {
                res.json({status: 1, mensaje: "usuario autenticado.", value: rows[0]});
            }
        });             
    });

    //REGISTER
    app.post('/register', (req, res) => {
        let consulta = `INSERT INTO usuario
                        (nombre, usuario, password, fnac, sexo)
                        VALUES
                        ('${req.body.nombre}', '${req.body.usuario}', '${req.body.password}', '${req.body.fnac}', '${req.body.sexo}')`;
        conn.query(consulta, (err, rows, cols) => {
            if (err) {
                res.json({status: 0, mensaje: "Error al insertar"});
            } else {
                res.json({status:1, mensaje: "Datos insertados satisfactoriamente"});
            }
        });
    });
}