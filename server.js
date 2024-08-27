const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDb = require("./config/connectDb");
const reviewRoutes = require("./routes/reviewRoutes");

dotenv.config();

connectDb();

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/api/v1/users", require("./routes/userRoute"));
app.use("/api/v1/transactions", require("./routes/transactionRoutes")); // Adjusted path to match the model name
app.use("/api/v1/categories", require("./routes/categoryRoutes"));
app.use("/api/v1/reviews", reviewRoutes); // Add this line to use review routes



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//----------------------------🌸🌸🌸------------------------------