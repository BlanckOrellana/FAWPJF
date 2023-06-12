const app = require("./config/server");

//esto es lo que cambia-----------------
require("./app/routes/login")(app);
require("./app/routes/comic")(app);
//--------------------------------------

app.listen(app.get("port"), () => console.log(`Escuchando en servidor puerto : ${app.get("port")}`));