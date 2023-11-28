const express = require("express")

const app = express();
const PORT = 8080;



//conectarse al puerto
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});