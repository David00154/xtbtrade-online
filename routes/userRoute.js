const express = require("express");
const { body, oneOf } = require("express-validator");
const {
	forwardAuthenticated,
	login,
	signup,
	validateErrors,
	validateSignupFields,
} = require("../controllers/authController.js");
const { prisma } = require("../utils/prisma.js");
const router = express.Router();

router
	.route("/login")
	.get(forwardAuthenticated, (req, res) => {
		res.render("login", {
			title: "Log in - Xtb Online Trade",
		});
	})
	.post(login);

router.route("/authorize").get((req, res) => {
	// console.log(req.query);
	console.log("authorizing and redirecting...");
	//
	req.flash(
		"success_msg",
		"Account verified, now you can login"
	);
	res.redirect("/user/login");
});

router
	.route("/signup")
	.get((req, res) => {
		res.render("signup", {
			title: "Sign up - Xtb Online Trade",
		});
	})
	.post(
		validateSignupFields,
		validateErrors,
		// validateErrors,
		signup
	);
router.get("/logout", (req, res) => {
	req.session.current_url = "";
	req.logout();
	req.flash("success_msg", "You are logged out");
	res.redirect("/user/login");
});

module.exports = router;
