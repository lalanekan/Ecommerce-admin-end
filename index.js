import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoute from "./routes/product-route.js"
import userRoute from "./routes/user-route.js"



const app = express();
app.use(cors());
const port = 5000;
app.use(express.json());

app.use("/api/product",productRoute);
app.use("/register",userRoute);

mongoose
  .connect("mongodb+srv://admin:YqVH4BJIqmwGO8ys@cluster0.w1repoh.mongodb.net/e-commerce?retryWrites=true&w=majority")
  .then(() =>
    app.listen(port))
    .then(() => console.log(`Connected to database and listening on port ${port} `))
    .catch((error) => console.log(error));


