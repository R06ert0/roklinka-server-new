const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const DB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://lucka:Lucy2021@cluster0.13ghr.mongodb.net/robert?retryWrites=true&w=majority";
const PORT = process.env.PORT;

const safelyConnect = async () => {
  await mongoose.connect(DB_URI);
  console.log("Connected succesfully!");
};

safelyConnect().catch((err) => console.log(err));

app.use(express.json());
app.use(cors({}));

/* app.set('view engine', 'ejs') */

app.get("/", (req, res) => {
  /* res.render('index', { text: 'NAZDAR' }) ← This with ejs is similar to PHP  */
  res.sendStatus(200);
});

const occupiedRouter = require("./routes/occupied");

app.use("/occupied", occupiedRouter);

app.listen(PORT || 4, (err) => {
  if (err) throw err;
  console.log("%c Server running", "color: green");
});
