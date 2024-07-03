const { oneOf, body, query } = require("express-validator");
const { prisma } = require("../utils/prisma.js");
const nodemailer = require("nodemailer");
const { emailTemplate } = require("../utils/emailTemplate");

const { mailConfig } = require("../utils/mailConfig.js");
const {
  PrismaClientUnknownRequestError,
} = require("@prisma/client/runtime/library");

const sendNotification = async (req, res, next) => {
  const { email, title, body } = req.body;
  // const user = await prisma.user.findUnique({
  // 	where: {
  // 		email: email,
  // 	},
  // });

  // let date =
  // 	new Date(Date.now()).getFullYear() +
  // 	"-" +
  // 	(new Date(Date.now()).getMonth() + 1) +
  // 	"-" +
  // 	new Date(Date.now()).getDate(); // yyyy-mm-dd

  // const sentNotification = await prisma.notification.create({
  // 	data: {
  // 		body,
  // 		title,
  // 		userId: user.id,
  // 		date,
  // 	},
  // });
  // console.log(sentNotification);
  // // res.send("oks");
  // req.flash("success_msg", "Notification sent");
  // res.redirect("/admin/send-notification");
  // next();
  // console.log(req.body);
  // req.flash("success_msg", "Email and notification sent boss");
  // res.redirect("/admin/send-notification");
  // next();
  // console.log(body.replace("&#10", "<br />").replace("&#13", "<br />"));
  // console.log(body)

  let transporter = nodemailer.createTransport(mailConfig);
  // console.log(body.match(/[\r\n|\r|\n]/gm))
  // [\n]/gm
  const captureNReplaceNewLine = () => {
    let x = body;
    /**
     * @type {String[]|null}
     */
    let match = body.match(/[\n]/gm);
    if (match) {
      match.forEach((element) => {
        x = x.replace(element, "<br />");
      });
    }
    return x;
  };
  console.log(email);
  let mailOptions = {
    from: `"Admin@ Xtb Online Trading"
			<${mailConfig.auth.user}>`,
    to: email,
    subject: title,
    // text: body,
    html: emailTemplate({
      body: captureNReplaceNewLine(),
      title: title,
      url: "xtbfx.online",
    }),
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error != null) {
      console.log(error.message);
      console.log("There is an error");
      //   res.status(500).json({error: "Internal Server Error"})
      req.flash("error_msg", error.message);
      res.redirect("/admin/send-notification");
      next();
    } else {
      console.log("Email sent: " + info.response);
      req.flash("success_msg", "Email and notification sent boss");
      res.redirect("/admin/send-notification");
      next();
    }
  });
  // res.redirect("/admin/send-notification");
  // next();
};

const updateUserStat = async (req, res, next) => {
  const { earning, balance, deposit, withdraws, uid } = req.body;

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
const updateAccountStatus = async (req, res, next) => {
  try {
    const { status, uid } = req.body;
    console.log("here ", req.body);
    const updatedUser = await prisma.user.update({
      where: {
        id: uid,
      },
      data: {
        account_status: status,
      },
    });
    req.flash("success_msg", "Account status updated");
    res.redirect("/admin/update-account-status");
    next();
  } catch (error) {
    if (error instanceof PrismaClientUnknownRequestError) {
      req.flash("error_msg", error.message);
      res.redirect("back");
    } else {
      req.flash("error_msg", "Internal Server Error");
      res.redirect("back");
    }
    next();
  }
};
const deleteUser = async (req, res, next) => {
  const { user_id } = req.params;
  const deleteNotification = prisma.notification.deleteMany({
    where: {
      userId: user_id,
    },
  });
  const deleteLatestTransaction = prisma.latestTransaction.deleteMany({
    where: {
      userId: user_id,
    },
  });
  const deleteDeposits = prisma.deposit.deleteMany({
    where: {
      userId: user_id,
    },
  });
  const deleteStat = prisma.stat.deleteMany({
    where: {
      userId: user_id,
    },
  });

  const deleteUser = prisma.user.delete({
    where: {
      id: user_id,
    },
  });

  const transaction = await prisma.$transaction([
    deleteNotification,
    deleteDeposits,
    deleteLatestTransaction,
    deleteStat,
    deleteUser,
  ]);
  console.log(transaction);
  req.flash("success_msg", `User ${transaction.at(4).name} has been deleted`);
  res.redirect("/admin/users");
  next();
};
//
const validateUpdateUserFields = oneOf([
  [
    body("uid").exists().withMessage("Enter a user id to update"),
    body("earning").notEmpty().withMessage("Please add earning for the user"),
    body("deposit").notEmpty().withMessage("Please add deposit for the user"),
    body("balance").notEmpty().withMessage("Please add balance for the user"),
    body("withdraws")
      .notEmpty()
      .withMessage("Please add withdraws for the user"),
  ],
]);

const validateUpdateAccountStatusFields = oneOf([
  [
    // body("uid").if
    body("uid").exists().withMessage("Enter a user id to update"),
    body("status")
      .notEmpty()
      .withMessage("Please add account status for the user"),
  ],
]);

const validateNotificationsFields = oneOf([
  [
    body("title").notEmpty().withMessage("Title field is required"),
    body("body").notEmpty().withMessage("Body field is required"),
    body("email").notEmpty().withMessage("Please select a user email"),
  ],
]);

module.exports = {
  validateNotificationsFields,
  validateUpdateUserFields,
  validateUpdateAccountStatusFields,
  updateUserStat,
  sendNotification,
  deleteUser,
  updateAccountStatus,
};
