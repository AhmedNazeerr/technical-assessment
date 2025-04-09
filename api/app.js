const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const connectDB= require("./db/connect.js")
const {
 approvePendingVerification,
 getPendingVerificationCount,
} = require("./services/handleMeta.js")
const { checkAPIHealth } = require("./services/checkAPIHealth.js")
const { verify, check } = require("./services/KYCverify.js")

const ProductRouter= require("./routes/productroute.js")

dotenv.config()
const app = express()

app.use(
 cors({
  credentials: true,
  sameSite: "none",
  origin: process.env.FRONTEND_URL.split(",") ?? "http://localhost:3000",
  optionsSuccessStatus: 200,
 })
)

app.use(express.json())
app.use(cookieParser())


app.use("/api/v1/products", ProductRouter) // Use the product router for all product-related routes

app.get("/health", checkAPIHealth)
app.post("/kyc-verify", verify)

app.post("/kyc-check", check)
const port = 5000
const start = async () => {
    try {
      await connectDB(process.env.MONGO_URL);
      app.listen(port, () => console.log(`Server is running on port ${port}`)); // FIXED
    } catch (error) {
      console.log(error);
    }
  };
  
  start();
  module.exports = app;