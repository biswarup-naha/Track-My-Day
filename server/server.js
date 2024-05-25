import express, { json, urlencoded } from "express";
import cors from "cors";
import { config } from "dotenv";
import fs from "fs"
import todoRoutes from "./routes/todo.routes";

config();
const app=express();
const PORT=process.env.PORT || 4000;
const filePath = "./todos.json";

//middlewares
app.use(cors())
app.use(json())
// app.use(urlencoded({extended: false}))

//initializtion of todo file
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]),(err)=>console.log(err,"file cannot be created"));
}

//routes
app.use("/tasks",todoRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`)
});

