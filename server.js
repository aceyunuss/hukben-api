const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

var corsOptions = {
  origin: "http://localhost:3001",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to asdasd application." });
});

//add routes

// require("./app/routes/auth")(app);
require("./app/routes/menu_category_routes")(app);
require("./app/routes/menu_routes")(app);
require("./app/routes/promo_routes")(app);
require("./app/routes/user_routes")(app);
require("./app/routes/cart_routes")(app);
require("./app/routes/driver_routes")(app);
require("./app/routes/order_routes")(app);

// set port, listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//add connection db
const db = require("./app/models");
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
