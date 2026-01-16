

const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/user.js');

// Index	‘/users/:userId/foods’	GET
// New	‘/users/:userId/foods/new’	GET
// Create	‘/users/:userId/foods’	POST
// Show	‘/users/:userId/foods/:itemId’	GET
// Edit	‘/users/:userId/foods/:itemId/edit’	GET
// Update	‘/users/:userId/foods/:itemId’	PUT
// Delete	‘/users/:userId/foods/:itemId’	DELETE

// Index

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);

        res.render("foods/index.ejs", {
            foods: currentUser.foods,
        });

    } catch (error) {
        console.log(error);
        res.redirect("/")
    }
});

// New

router.get('/new', (req, res) => {
    try {
        res.render('foods/new.ejs');
    } catch (error) {
        console.log("error");
        res.redirect("/")
    }
});

// Delete

router.delete("/:itemId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);

        currentUser.foods.id(req.params.itemId).deleteOne();

        await currentUser.save()
        res.redirect(`/users/${req.session.user._id}/foods`)
        console.log(req.params.itemId)
    } catch (error) {
        console.log("error");
        res.redirect("/")
    }
})



// Update

router.put("/:itemId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const food = currentUser.foods.id(req.params.itemId);

        food.set(req.body);
        await currentUser.save();

        res.redirect(`/users/${req.session.user._id}/foods`)
    } catch (error) {
        console.log(error)
        res.redirect("/")
    }
});



// Create

router.post("/", async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id)
        user.foods.push(req.body)
        await user.save()
        res.redirect(`/users/${req.session.user._id}/foods`)
    } catch (error) {
        console.log(error)
        res.redirect("/")
    }
})

// Edit

router.get("/:itemId/edit", async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id)
        const food = user.foods.id(req.params.itemId)
        res.render("foods/edit.ejs", { food, user })
    } catch (error) {
        console.log(error)
        res.redirect("/")
    }
})


// Show


module.exports = router;