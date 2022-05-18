require("dotenv");

const express = require("express");
const path = require("path");
const cors = require("cors");
const { fileURLToPath } = require("url");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const { __passport__ } = require("./utils/passport.js");
const MongoStore = require("connect-mongo");

// import appRoute from "./routes/appRoute.js";
// import userRoute from "./routes/userRoute.js";
// import adminRoute frp
const {
	adminRoute,
	userRoute,
	appRoute,
	dashboardRoute,
} = require("./routes/index.js");

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// console.log(__dirname);
const app = express();

__passport__(passport);

// middlewares;
app.use(cors());
// EJS
app.use(express.static(path.join(__dirname, "static")));
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
	session({
		secret: "secret",
		resave: false,
		saveUninitialized: false,
		// store: MongoStore.create({
		// 	mongoUrl: "mongodb://u4fakmxzdkt0pd4msndg:6WDZB5FOhYXzK3jIA3mj@bqydofpk5iljqqq-mongodb.services.clever-cloud.com:27017/bqydofpk5iljqqq",
		// 	dbName: "bqydofpk5iljqqq",
		// 	autoRemove: "disabled",
		// 	touchAfter: 24 * 3600
		// }),
		store: new (require("connect-pg-simple")(session))({
			createTableIfMissing: true,
		}),
		cookie: { maxAge: 2 * 24 * 60 * 60 * 1000 },
	})
);
//
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
	res.locals.success_msg = req.flash("success_msg");
	res.locals.error_msg = req.flash("error_msg");
	res.locals.error = req.flash("error");
	next();
});
//
// routes
app.use("/", appRoute);
app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/dashboard", dashboardRoute);
// app.use("*", (req, res) => {
// 	res.statusCode = 404;
// 	res.send(
// 		`Path "${req.baseUrl}" with method ${req.method} not found.`
// 	);
// });

const port = process.env.PORT || 500;

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});

module.exports = app;
