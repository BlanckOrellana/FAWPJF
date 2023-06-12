const conn = require("../../config/database");
module.exports = (app) => {
    //GET -> SELECT
    app.get('/saludo', (req, res) => {
        res.json({saludo: "hola mundo"});
    });

    app.get('/operacion', (req, res) => {
        let consulta = "SELECT id, operando1, operando2, operacion, resultado FROM operacion";
        conn.query(consulta, (err, rows, cols) => {
            if (err) {
                res.status(500).json({status: 0, mensaje: "Error en el servidor"});
            } else {
                res.json({status:1, mensaje: "Datos obtenidos", values: rows});
            }
        });
    });
    app.get('/operacion/:id', (req, res) => {
        let consulta = `SELECT id, operando1, operando2, operacion, resultado FROM operacion
                        WHERE id = ${req.params.id}`;
        conn.query(consulta, (err, rows, cols) => {
            if (err) {
                res.status(500).json({status: 0, mensaje: "Error en el servidor"});
            } else if (rows.length > 0) {
                res.json({status:1, mensaje: "Datos obtenidos", values: rows[0]});
            } else {
                res.status(400).json({status: 0, mensaje: `No se encontro el id ${req.params.id}`});
            }
        });
    });

    //POST -> INSERT
    app.post('/operacion', (req, res) => {
        let consulta = `INSERT INTO operacion (operando1, operando2, operacion, resultado)
                        VALUES (${req.body.op1},${req.body.op2},${req.body.op},${req.body.res})`;
        conn.query(consulta, (err, rows, cols) => {
            if (err) {
                res.status(500).json({status: 0, mensaje: "Error al insertar"});
            } else {
                res.json({status:1, mensaje: "Datos insertados satisfactoriamente"});
            }
        });
    });

    //DELET -> DELETE
    app.delete('/operacion/:id', (req, res) => {
        let consulta = `DELETE FROM operacion
                        WHERE id = ${req.params.id}`;
        conn.query(consulta, (err, rows, cols) => {
            if (err) {
                res.status(500).json({status: 0, mensaje: "Error al borrar"});
            } else {
                res.json({status: 1, mensaje: `Se elimino el id ${req.params.id}`});
            }
        });
    });

    //PUT -> UPDATE
    app.put('/operacion/:id', (req, res) => {
        let resultado = 0;
        switch(req.body.op) {
            case 1 : resultado = req.body.op1 + req.body.op2; break;
            case 2 : resultado = req.body.op1 - req.body.op2; break;
            case 3 : resultado = req.body.op1 * req.body.op2; break;
            case 4 : resultado = req.body.op1 / req.body.op2; break;
        }
        let consulta = `UPDATE operacion
        SET
        operando1 = ${req.body.op1},
        operando2 = ${req.body.op2},
        operacion = ${req.body.op},
        resultado = ${resultado}
        WHERE id = ${req.params.id}`;
        conn.query(consulta, (err, rows, cols) => {
            if (err) {
                res.status(500).json({status: 0, mensaje: "Error al modificar"});
            } else {
                res.json({status: 1, mensaje: `Se modifico el id ${req.params.id}`});
            }
        });
    });
}