const conn = require('../../config/database');

module.exports = (app) => {
    //grados
    app.get("/grados", (req, res) => {
        let consulta = "SELECT * FROM grados";
        conn.query(consulta, (err, row, col) => {
            if (err) {
                res.json({status: 0, mensaje: "Error en el servidor"});
            } else {
                res.json({status: 1, mensaje: "Grados consultados", grados: row});
            }
        });
    });

    //materias
    app.get("/materias/:grado", (req, res) => {
        let consulta = `SELECT * FROM materias WHERE id_grado = ${req.params.grado}`;
        conn.query(consulta, (err, row, col) => {
            if (err) {
                res.json({status: 0, mensaje: "Error en el servidor"});
            } else {
                res.json({status: 1, mensaje: "Materias consultadas", materias: row});
            }
        });
    });
}