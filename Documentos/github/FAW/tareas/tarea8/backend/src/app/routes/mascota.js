conn = require('../../config/database');

module.exports = (app) => {
    //SELECT *
    app.get('/mascota', (req, res) => {
        let consulta = "SELECT * FROM mascota";
        conn.query(consulta, (err, rows, cols) => {
            if (err) {
                res.json({status: 0, mensaje: "Error en el servidor"});
            } else {
                res.json({status: 1, mensaje: "Datos obtenidos", values: rows});
            }
        });
    });

    //SELECT * WHERE
    app.get('/mascota/:id', (req, res) => {
        let consulta = `SELECT * FROM mascota
                        WHERE id = ${req.params.id}`;
        conn.query(consulta, (err, rows, cols) => {
            if (err) {
                res.json({status: 0, mensaje: "Error en el servidor"});
            } else if (rows.length > 0) {
                res.json({status:1, mensaje: "Datos obtenidos", values: rows[0]});
            } else {
                res.json({status: 0, mensaje: `No se encontro el id ${req.params.id}`});
            }
        });
    });

    //INSERT
    app.post('/mascota', (req, res) => {
        let consulta = `INSERT INTO mascota (nombre, raza, dueno) VALUES ('${req.body.nombre}',${req.body.raza},'${req.body.dueno}')`;
        conn.query(consulta, (err, rows, cols) => {
            if (err) {
                res.json({status: 0, mensaje: "Error al insertar"});
            } else {
                res.json({status:1, mensaje: "Datos insertados satisfactoriamente"});
            }
        });
    });

    //DELETE
    app.delete('/mascota/:id', (req, res) => {
        let consulta = `DELETE FROM mascota
                        WHERE id = ${req.params.id}`;
        conn.query(consulta, (err, rows, cols) => {
            if (err) {
                res.json({status: 0, mensaje: "Error al borrar"});
            } else {
                res.json({status: 1, mensaje: `Se elimino el id ${req.params.id}`});
            }
        });
    });

    //UPDATE
    app.put('/mascota/:id', (req, res) => {
        
        let raza = 0;
        switch(req.body.raza.toUpperCase()) {
            case "PERRO": raza = 1; break;
            case "GATO": raza = 2; break;
            case "CONEJO": raza = 3; break;
            default: raza = 0;
        }
        
        let consulta = `UPDATE mascota
        SET
        nombre = '${req.body.nombre}',
        raza = '${raza}',
        dueno = '${req.body.dueno}'
        WHERE id = ${req.params.id}`;

        conn.query(consulta, (err, rows, cols) => {
            if (err) {
                res.json({status: 0, mensaje: "Error al modificar", error: err});
            } else {
                res.json({status: 1, mensaje: `Se modifico el id ${req.params.id}`});
            }
        });
    });

}