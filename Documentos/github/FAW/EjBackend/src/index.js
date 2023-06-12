const app = require("./config/server");

//esto es lo que cambia-----------------
require("./app/routes/operacion")(app);
require("./app/routes/cursos")(app);
require("./app/routes/login")(app);
//--------------------------------------

app.listen(app.get("port"), () => console.log(`Escuchando en servidor puerto : ${app.get("port")}`));