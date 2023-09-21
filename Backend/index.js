const app = require("./app");
const dotenv = require("dotenv");
const conectDatabas = require("./config/databas");
//handling uncatch expation

process.on("uncaughtException", (err) => {
  console.error(`Uncaught Exception:${err.message} `);
  console.log("Shutting down the server due to uncatch Excepetion Rejection");

  process.exit(1);
});

// Config
dotenv.config({ path: "Backend/config/config.env" });
//connection to databas
conectDatabas();
app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

//Unhandle Promise Rejection
process.on("unhandlePromise Rejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log("Shutting down the server due to unhandle promise Rejection");

  server.close(() => {
    process.exit(1);
  });
});
