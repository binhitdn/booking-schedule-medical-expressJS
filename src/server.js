import express from "express"
import bodyParser from "body-parser"
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./route/web"
import connectDB from "./config/connectDB"
require("dotenv").config()
import cors from "cors"

let app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));


app.use(cors({ credentials: true, origin: true })); 



viewEngine(app);
initWebRoutes(app);


connectDB();

let port = process.env.PORT 
app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
})


