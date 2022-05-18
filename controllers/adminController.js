const { oneOf, body, query } = require("express-validator");
const { prisma } = require("../utils/prisma.js");
const sendNotification = async (req, res, next) => {
	const { email, title, body } = req.body;
	const user = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});

	let date =
		new Date(Date.now()).getFullYear() +
		"-" +
		(new Date(Date.now()).getMonth() + 1) +
		"-" +
		new Date(Date.now()).getDate(); // yyyy-mm-dd

	const sentNotification = await prisma.notification.create({
		data: {
			body,
			title,
			userId: user.id,
			date,
		},
	});
	console.log(sentNotification);
	// res.send("oks");
	req.flash("success_msg", "Notification sent");
	res.redirect("/admin/send-notification");
	next();
};

const updateUserStat = async (req, res, next) => {
	const { earning, balance, deposit, withdraws, uid } =
		req.body;

	const updatedUser = await prisma.stat.update({
		where: {
			userId: uid,
		},
		data: {
			balance,
			earning,
			deposit,
			withdraws,
		},
	});
	req.flash("success_msg", "User updated");
	res.redirect("/admin/update-person");
	next();
};
//
const validateUpdateUserFields = oneOf([
	[
		body("uid")
			.exists()
			.withMessage("Enter a user id to update"),
		body("earning")
			.notEmpty()
			.withMessage("Please add earning for the user"),
		body("deposit")
			.notEmpty()
			.withMessage("Please add deposit for the user"),
		body("balance")
			.notEmpty()
			.withMessage("Please add balance for the user"),
		body("withdraws")
			.notEmpty()
			.withMessage("Please add withdraws for the user"),
	],
]);

const validateNotificationsFields = oneOf([
	[
		body("title")
			.notEmpty()
			.withMessage("Title field is required"),
		body("body")
			.notEmpty()
			.withMessage("Body field is required"),
		body("email")
			.notEmpty()
			.withMessage("Please select a user email"),
	],
]);

module.exports = {
	validateNotificationsFields,
	validateUpdateUserFields,
	updateUserStat,
	sendNotification,
};
