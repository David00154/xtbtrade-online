const express = require("express");
const {
	ensureAuthenticated,
	validateWithdrawFormFields,
	validateErrors,
	validateDepositFormFields,
} = require("../controllers/authController.js");
const { prisma } = require("../utils/prisma.js");

const router = express.Router();
router.use((req, res, next) => {
	req.session.current_url = req.baseUrl + "" + req.url;
	next();
});

router.route("/").get(ensureAuthenticated, async (req, res) => {
	// console.log(req.user.id);
	try {
		let name =
			req.user.name.split(" ")[0][0].toUpperCase() +
			req.user.name.split(" ")[0].slice(1);
		let user = req.user;
		let email = req.user.email;
		let {
			stat: { balance, deposit, earning, withdraws },
			notification,
			latestTransactions,
		} = await prisma.user.findUnique({
			where: {
				id: req.user.id,
			},
			select: {
				stat: {
					select: {
						balance: true,
						deposit: true,
						earning: true,
						withdraws: true,
					},
				},
				latestTransactions: {
					select: {
						amount: true,
						status: true,
						date: true,
					},
				},
				notification: {
					select: {
						title: true,
						date: true,
					},
				},
			},
		});
		res.render(
			"backend/dashboard",
			buildObject({
				title: "Dashboard",
				layout: "backend/layout",
				user: req.user,
				name,
				earning,
				deposit,
				balance,
				withdraws,
				notification,
				email: req.user.email,
				extractScripts: true,
				latestTransactions,
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
});
router
	.route("/wallet")
	.get(ensureAuthenticated, async (req, res) => {
		// console.log(req.user.id);
		try {
			let name =
				req.user.name.split(" ")[0][0].toUpperCase() +
				req.user.name.split(" ")[0].slice(1);
			let user = req.user;
			let email = req.user.email;
			let {
				stat: { balance, deposit, earning, withdraws },
				latestTransactions,
				notification,
			} = await prisma.user.findUnique({
				where: {
					id: req.user.id,
				},
				select: {
					stat: {
						select: {
							balance: true,
							deposit: true,
							earning: true,
							withdraws: true,
						},
					},
					latestTransactions: {
						select: {
							amount: true,
							status: true,
							date: true,
						},
					},
					notification: {
						select: {
							title: true,
							date: true,
						},
					},
				},
			});
			res.render(
				"backend/wallet",
				buildObject({
					title: "Withdraw",
					layout: "backend/layout",
					user,
					name,
					email,
					earning,
					deposit,
					balance,
					withdraws,
					latestTransactions,
					notification,
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
	});

router
	.route("/withdraw")
	.get(ensureAuthenticated, async (req, res) => {
		// console.log(req.user.id);
		try {
			let name =
				req.user.name.split(" ")[0][0].toUpperCase() +
				req.user.name.split(" ")[0].slice(1);
			let user = req.user;
			let email = req.user.email;
			res.render(
				"backend/withdraw",
				buildObject({
					title: "Withdraw",
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
	})
	.post(
		ensureAuthenticated,
		validateWithdrawFormFields,
		validateErrors,
		async (req, res, next) => {
			const { amount } = req.body;

			let date =
				new Date(Date.now()).getFullYear() +
				"-" +
				(new Date(Date.now()).getMonth() + 1) +
				"-" +
				new Date(Date.now()).getDate(); // yyyy-mm-dd
			const latestTransaction =
				await prisma.latestTransaction.create({
					data: {
						amount,
						userId: req.user.id,
						status: false,
						date,
					},
				});
			req.flash(
				"success_msg",
				"Your withdrawal request is processing, we will send you feedback soon."
			);
			res.redirect("/dashboard/withdraw");
		}
	);

router
	.route("/deposit")
	.get(ensureAuthenticated, async (req, res) => {
		try {
			let name =
				req.user.name.split(" ")[0][0].toUpperCase() +
				req.user.name.split(" ")[0].slice(1);
			let user = req.user;
			let email = req.user.email;
			res.render(
				"backend/deposit",
				buildObject({
					title: "Deposit",
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
	})
	.post(
		ensureAuthenticated,
		validateDepositFormFields,
		validateErrors,
		async (req, res) => {
			const { amount, address } = req.body;
			let date =
				new Date(Date.now()).getFullYear() +
				"-" +
				(new Date(Date.now()).getMonth() + 1) +
				"-" +
				new Date(Date.now()).getDate(); // yyyy-mm-dd
			const latestTransaction = await prisma.deposit.create({
				data: {
					userId: req.user.id,
					address,
					amount,
					date,
					recieved: false,
				},
			});
			req.flash(
				"success_msg",
				"We will update your assets when our systems has verified the deposit."
			);
			res.redirect("/dashboard/deposit");
		}
	);

// router
// 	.route("/notifications")
// 	.get(ensureAuthenticated, (req, res) => {
// 		let name =
// 			req.user.name.split(" ")[0][0].toUpperCase() +
// 			req.user.name.split(" ")[0].slice(1);
// 		res.render(
// 			"notifications",
// 			buildObject({
// 				title: "Notifications",
// 				layout: "_layouts/dashboard_layout",
// 				name,
// 				user: req.user,
// 			})
// 		);
// 	});

router
	.route("/markets")
	.get(ensureAuthenticated, async (req, res) => {
		// console.log(req.user.id);
		try {
			let name =
				req.user.name.split(" ")[0][0].toUpperCase() +
				req.user.name.split(" ")[0].slice(1);
			let user = req.user;
			let email = req.user.email;
			let {
				stat: { balance, deposit, earning, withdraws },
				notification,
			} = await prisma.user.findUnique({
				where: {
					id: req.user.id,
				},
				select: {
					stat: {
						select: {
							balance: true,
							deposit: true,
							earning: true,
							withdraws: true,
						},
					},
					notification: {
						select: {
							title: true,
							date: true,
						},
					},
				},
			});
			res.render(
				"backend/markets",
				buildObject({
					title: "Markets",
					layout: "backend/layout",
					user: req.user,
					name,
					// earning,
					// deposit,
					// balance,
					// withdraws,
					notification,
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
	});

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
		// success_msg,
	};
}

module.exports = router;
