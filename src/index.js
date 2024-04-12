const path = require("path");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const { engine } = require("express-handlebars");
const route = require("./routes");
const db = require("./config/db");

const app = express();
const port = 3000;

// Connect db
db.connect();

// Static file
app.use(express.static(path.join(__dirname, "public")));

// Middleware xử lý dữ liệu được post lên server
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

app.use(methodOverride("_method"));

// HTTP logger
app.use(morgan("combined"));

// Template engine
app.engine(
    ".hbs",
    engine({
        extname: ".hbs",
        helpers: {
            sum: (a, b) => a + b,
        },
    })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources/views"));

// Route Init
route(app);

// Run Host
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
