const express = require("express");
const {
	ensureAuthenticated,
	restrictToAdmin,
	validateErrors,
} = require("../controllers/authController.js");

const {
	sendNotification,
	validateNotificationsFields,
	validateUpdateUserFields,
	updateUserStat,
} = require("../controllers/adminController.js");
const { prisma } = require("../utils/prisma.js");

const router = express.Router();

router
	.get(
		"/",
		ensureAuthenticated,
		restrictToAdmin,
		async (req, res) => {
			res.redirect("/admin/users");
		}
	)
	.get(
		"/users",
		ensureAuthenticated,
		restrictToAdmin,
		async (req, res) => {
			try {
				let name =
					req.user.name.split(" ")[0][0].toUpperCase() +
					req.user.name.split(" ")[0].slice(1);
				let user = req.user;
				let email = req.user.email;
				let users = await prisma.user.findMany({
					// latestTransactions,
					select: {
						name: true,
						email: true,
						id: true,
						stat: {
							select: {
								balance: true,
								deposit: true,
								earning: true,
								withdraws: true,
							},
						},
						deposits: {
							select: {
								address: true,
								userId: true,
								createdAt: true,
								amount: true,
								recieved: true,
								user: {
									select: {
										email: true,
									},
								},
							},
						},
					},
				});
				// console.log(users[0].deposits);
				res.render(
					"backend/admin/users",
					buildObject({
						title: "Admin | Users",
						layout: "backend/layout",
						user: req.user,
						id: req.user.id,
						users,
						name,
						email: req.user.email,
						extractScripts: true,
					})
				);
			} catch (err) {
				console.log(err);
				req.flash(
					"error_msg",
					"Error trying to locate the page, try loging in."
				);
				res.redirect("/user/login");
			}
		}
	);

router.get(
	"/send-notification",
	ensureAuthenticated,
	restrictToAdmin,
	async (req, res) => {
		try {
			let name =
				req.user.name.split(" ")[0][0].toUpperCase() +
				req.user.name.split(" ")[0].slice(1);
			let user = req.user;
			let email = req.user.email;
			res.render(
				"backend/admin/send-notification",
				buildObject({
					title: "Send Notification",
					layout: "backend/layout",
					user,
					name,
					email,
				})
			);
		} catch (err) {
			console.log(err);
			req.flash(
				"error_msg",
				"Error trying to locate the page, try loging in."
			);
			res.redirect("/user/login");
		}
	}
);
//
router.get(
	"/update-person",
	ensureAuthenticated,
	restrictToAdmin,
	async (req, res) => {
		try {
			let name =
				req.user.name.split(" ")[0][0].toUpperCase() +
				req.user.name.split(" ")[0].slice(1);
			let user = req.user;
			let email = req.user.email;
			res.render(
				"backend/admin/update-user",
				buildObject({
					title: "Update User",
					layout: "backend/layout",
					user,
					name,
					email,
				})
			);
		} catch (err) {
			console.log(err);
			req.flash(
				"error_msg",
				"Error trying to locate the page, try loging in."
			);
			res.redirect("/user/login");
		}
	}
);

router.post(
	"/send-notification",
	ensureAuthenticated,
	restrictToAdmin,
	validateNotificationsFields,
	validateErrors,
	sendNotification
);

router.post(
	"/update-user",
	ensureAuthenticated,
	restrictToAdmin,
	validateUpdateUserFields,
	validateErrors,
	updateUserStat
);

function buildObject(obj) {
	let {
		name = "",
		user = "",
		title = "",
		deposit = "",
		earning = "",
		balance = "",
		withdraws = "",
		email = "",
		extractScripts = true,
		latestTransactions = [],
		notification = [],
		id = "",
		users = [],
		// success_msg = "",
	} = obj;
	return {
		...obj,
		name,
		user,
		title,
		deposit,
		earning,
		balance,
		withdraws,
		email,
		extractScripts,
		latestTransactions,
		notifications: notification,
		id,
		users,
		// success_msg,
	};
}

// router.route(ensureAuthenticated)
module.exports = router;
