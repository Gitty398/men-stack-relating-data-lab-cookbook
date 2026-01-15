
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const morgan = require("morgan")
const methodOverride = require("method-override")
app.use(express.urlencoded({ extended: true }))
const authRoutes = require("./controllers/auth")
const foodsController = require("./controllers/foods")
const userController = require("./controllers/users")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');


// Middleware

require("./db/connection")
app.use(morgan("tiny"))

app.use(methodOverride("_method"))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    })
})
);


app.use((req, res, next) => {
    console.log('REQ ->', req.method, req.originalUrl);
    next();
});

// Routes

// Home

app.get("/", (req, res) => {
    res.render("index.ejs", {
        user: req.session.user
    })
})

app.use(passUserToView);
app.use("/auth", authRoutes)
app.use(isSignedIn)
app.use("/users/:userId/foods", foodsController)
app.use("/users", userController)


// Routes below require sign-in

app.use((req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.redirect("/")
    }
})


app.get("/vip-lounge", (req, res) => {
    if (req.session.user) {
        res.send(`Welcome to the party ${req.session.user.username}`)
    } else {
        res.send("Sorry no guests allowed")
    }
})


app.listen(PORT, () => {
    console.log("Running on", PORT)
})


