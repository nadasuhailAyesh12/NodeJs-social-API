const dbConnect = require('./db/dbConnection')
const app = require('./app')
const PORT = require("./config/enviroment/constants").port

dbConnect();

app.listen(PORT, console.log(`Server is running ${PORT}`));
