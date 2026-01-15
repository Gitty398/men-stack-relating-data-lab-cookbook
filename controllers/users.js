const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/user.js');


router.get("/", async (req, res) => {
    try {
        const users = await User.find({}, "username")
        res.render("users/index.ejs", { users })
    } catch (error) {
        console.error(error)
        res.redirect("/")
    }
})


module.exports = router;