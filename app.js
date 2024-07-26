const express = require("express");
const cors = require("cors");
const connection = require("./db/connection");
const roleroute = require("./routes/roleRoute");
const userroute = require("./routes/userRoute");
const seasonroute = require("./routes/seasonRoute");
const roundRoute = require("./routes/roundsRoute");
const teamRoute = require("./routes/teamroute");
const notificationRoute = require("./routes/notificationRoute");
const leagueRoute = require('./routes/leagueroutes');
const invitationroute =require("./routes/invitationRoutes");
const PORT = 6010;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./my-upload"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/role", roleroute);
app.use("/user", userroute);
app.use("/season", seasonroute);
app.use("/round", roundRoute);
app.use("/team", teamRoute);
app.use("/notification", notificationRoute );
app.use("/league",leagueRoute);
app.use("/invitation",invitationroute);
app.listen(PORT, () => {
  console.log(`server has started at ${PORT}`);
});
