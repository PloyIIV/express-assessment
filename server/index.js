import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { router as productRouter } from "./routes/products.js";

const port = 5000;
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()} ] ${req.method} ${req.url}`);
  next();
});


app.get("/", (req, res) => {
  return res.send("Hello.");
});

app.use('/products', productRouter)

app.use((err, req, res, next) => {
  return res.status(500).json({
    error: "There's something wrong.",
    message: err.message,
  });
});

const start = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log("Server is runnning on PORT:", port);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
