

const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// Index	‘/users/:userId/foods’	GET
// New	‘/users/:userId/foods/new’	GET
// Create	‘/users/:userId/foods’	POST
// Show	‘/users/:userId/foods/:itemId’	GET
// Edit	‘/users/:userId/foods/:itemId/edit’	GET
// Update	‘/users/:userId/foods/:itemId’	PUT
// Delete	‘/users/:userId/foods/:itemId’	DELETE

// Index

router.get('/', (req, res) => {
    res.render('foods/index.ejs');
});

// New

router.get('/new', (req, res) => {
    res.render('foods/new.ejs');
});

// Delete

// Update

// Create

router.post("/", async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id)
        user.foods.push(req.body)
        await user.save()
        res.redirect(`/foods`)
    } catch (error) {
        console.log(error)
        res.redirect("/")
    }
})

// Edit

// Show


module.exports = router;