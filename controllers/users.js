const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/user.js');

// Index
router.get("/", async (req, res) => {
    try {
        const users = await User.find({}, "username")
        res.render("users/index.ejs", { users })
    } catch (error) {
        console.error(error)
        res.redirect("/")
    }
})

// Show

router.get("/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        console.log(User)
        console.log(user)
        res.render("users/show.ejs", { user })
    } catch (error) {
        console.error(error)
        res.redirect("/")
    }
})


module.exports = router;