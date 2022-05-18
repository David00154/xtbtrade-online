const express = require("express");

const router = express.Router();

router.route("/").get((req, res) => {
	res.render("index", { title: "Xtb Online Trade" });
});
router.route("/about").get((req, res) => {
	res.render("about", { title: "About - Xtb Online Trade" });
	// res.redirect("/")
});
router.route("/contact-us").get((req, res) => {
	res.render("contact", {
		title: "Contact us - Xtb Online Trade",
	});
});

module.exports = router;
