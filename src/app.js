import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

const app = express()

// dotenv configuration
dotenv.config({
  path: "./.env",
});


app.use(cors());
app.use(express.json());

// import routes
import userRouter from "./routes/user.routes.js";
import categoryRouter from "./routes/cat.routes.js";

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);

export default app