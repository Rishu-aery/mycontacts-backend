const express = require("express");
const dotenv = require("dotenv").config();
const contactsRoute = require("./routes/contactsRouter.js");
const usersRoute = require("./routes/usersRouter.js");
const { errorHandler } = require("./middleware/error-handler.js");
const connectDb = require("./config/db-connection.js");

connectDb();
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.use("/api/contacts", contactsRoute);
app.use("/api/users", usersRoute);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})