conn = require('../../config/database');

module.exports = (app) => {
    //GET ALL COMICS FROM USER(ID)
    app.get('/comic/:id', (req, res) => {
        let query = `SELECT * FROM comic 
                     WHERE id_usuario = '${req.params.id}'`;
        conn.query(query, (err, rows, cols) => {
            if (err) {
                res.json({status: 0, mensaje: "Error en el servidor"});
            } else if (rows.length == 0) {
                res.json({status: 0, mensaje: "No se encontraron comics"});
            } else {
                res.json({status: 1, mensaje: "comics obtenidos", values: rows});
            }
        });             
    });

    //INSERT COMIC FOR USER(ID)
    app.post('/comic', (req, res) => {
        let consulta = `INSERT INTO comic (id_usuario, nombre, aimp, sinopsis, editorial)
                        VALUES (${req.body.id_usuario}, '${req.body.nombre}', ${req.body.aimp}, '${req.body.sinopsis}', '${req.body.editorial}')`;
        conn.query(consulta, (err, rows, cols) => {
            if (err) {
                res.json({status: 0, mensaje: "Error al insertar"});
            } else {
                res.json({status:1, mensaje: "Datos insertados satisfactoriamente"});
            }
        });
    });

    //DELETE COMIC BY COMIC(ID)[PK]
    app.delete('/comic/:id', (req, res) => {
        let consulta = `DELETE FROM comic
                        WHERE id = ${req.params.id}`;
        conn.query(consulta, (err, rows, cols) => {
            if (err) {
                res.json({status: 0, mensaje: "Error al borrar"});
            } else {
                res.json({status: 1, mensaje: `Se elimino el comic`});
            }
        });
    });

    //UPDATE COMIC BY COMIC(ID)
    app.put('/comic', (req, res) => {
        let consulta = `UPDATE comic 
                        SET 
                        nombre = '${req.body.nombre}', 
                        aimp = ${req.body.aimp},
                        sinopsis = '${req.body.sinopsis}',
                        editorial = '${req.body.editorial}'
                        WHERE id = ${req.body.id}`;
        conn.query(consulta, (err, rows, cols) => {
            if (err) {
                res.json({status: 0, mensaje: "Error al modificar", error: err});
            } else {
                res.json({status: 1, mensaje: `Se modifico el comic`});
            }
        });
    });
}