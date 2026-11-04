const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");
const db = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(db)
  .then(() => {
    console.log("DATABASE CONNECTED SUCCESSFULLY");
  })
  .catch(() => {
    console.log("DATABASE CONNECTION FAILED");
  });

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server listening on PORT: ${port}`);
});
