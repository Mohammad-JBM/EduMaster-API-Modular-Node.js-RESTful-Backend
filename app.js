const express = require("express");
const app = express();
const authRouter = require("./routes/v1/auth");
const usersRouter = require("./routes/v1/user");
const categoryRouter = require("./routes/v1/category");
const coursesRoter = require("./routes/v1/course");
const commentRouter = require("./routes/v1/comment");
const contactRouter = require("./routes/v1/contact");
const newsletterRouter = require("./routes/v1/newsletter");
const searchRouter = require("./routes/v1/search");
const notificationRouter = require("./routes/v1/notification");
const articleRouter = require("./routes/v1/article");
const offsRouter = require("./routes/v1/off");
const ordersRouter = require("./routes/v1/order");
const ticketRouter = require("./routes/v1/ticket");
const menusRouter = require("./routes/v1/menu");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

// BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Express Static
app.use(
  "/courses/covers",
  express.static(path.join(__dirname, "public", "courses", "covers"))
);
// Cors Middleware
app.use(cors());
// Auth router
app.use("/v1/auth", authRouter);
// UserRouter
app.use("/v1/users", usersRouter);
// Category Router
app.use("/v1/category", categoryRouter);
// Courses Router
app.use("/v1/course", coursesRoter);
// Comment Router
app.use("/v1/comments", commentRouter);
// Contact Router
app.use("/v1/contact", contactRouter);
// Newsletter Router
app.use("/v1/newsletters", newsletterRouter);
// Search Router
app.use("/v1/search", searchRouter);
// Search Router
app.use("/v1/notifications", notificationRouter);
// off Router
app.use("/v1/offs", offsRouter);
// Articles Router
app.use("/v1/articles", articleRouter);
// Orders Router
app.use("/v1/orders", ordersRouter);
// Tickets Router
app.use("/v1/tickets", ticketRouter);
// Menus Router
app.use("/v1/menus", menusRouter);

module.exports = app;