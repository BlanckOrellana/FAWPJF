const conn = require("../../config/database");

module.exports = (app) => {
    //GET localhost:8888/ahorro  -- select *
    app.get('/ahorro', (req, res) => {
        let consulta = "SELECT * FROM ahorro";
        conn.query(consulta, (err, row, col) => {
            if (err) {
                res.json({status: 0, mensaje: "hubo un prolema con la base de datos"});
            } else {
                res.json({status: 1, mensaje: "Datos Obtenidos", values: row});
            }
        });
    });

    //PUT localhost:8888/incrementa_mes UPDATE WHERE
    app.post('/incrementa_mes/:id', (req, res) => {
        //primero obtenemos los meses actuales
        let consulta0 = `SELECT meses_ahorrado FROM ahorro
                         WHERE id = ${req.params.id}`;
        conn.query(consulta0, (err, row, col) => {
            if (err) {
                res.json({status: 0, mensaje: "Error al obtener la informacion"});
            } else {
                //ahora que ya tenemos los meses ya podemos hacer update
                let meses = row[0].meses_ahorrado + 1;
                let consulta = `UPDATE ahorro
                SET
                meses_ahorrado = ${meses}
                WHERE id = ${req.params.id}`;
                conn.query(consulta, (err, rows, cols) => {
                    if (err) {
                        res.json({status: 0, mensaje: "Error al modificar"});
                    } else {
                        res.json({status: 1, mensaje: `Se incremento el mes del id ${req.params.id}`});
                    }
                });
            }
        });
    });

    //POST 888/incrementa_ahorro/:id_ahorro
    app.post('/incrementa_ahorro/:id', (req, res) => {
        //primero obtenemos la cuota y tambien el total ahorrado
        let consulta0 = `SELECT cuota, total_ahorrado FROM ahorro
                         WHERE id = ${req.params.id}`;
        conn.query(consulta0, (err, row, col) => {
            if (err) {
                res.json({status: 0, mensaje: "Error al obtener la informacion"});
            } else {
                //ahora que ya tenemos la cuota y el total los sumamos
                let nuevoTotal = row[0].cuota + row[0].total_ahorrado;
                let consulta = `UPDATE ahorro
                SET
                total_ahorrado = ${nuevoTotal}
                WHERE id = ${req.params.id}`;
                conn.query(consulta, (err, rows, cols) => {
                    if (err) {
                        res.json({status: 0, mensaje: "Error al modificar"});
                    } else {
                        res.json({status: 1, mensaje: `Se incremento el mes del id ${req.params.id}`});
                    }
                });
            }
        });
    });


}