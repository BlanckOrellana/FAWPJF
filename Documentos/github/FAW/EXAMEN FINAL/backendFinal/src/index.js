const app = require("./config/server");

//esto es lo que cambia por c tabla----
require("./app/routes/ahorro")(app);

//--------------------------------------

app.listen(app.get("port"), () => console.log(`Escuchando en servidor puerto : ${app.get("port")}`));