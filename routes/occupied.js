const express = require("express");
const fs = require("fs");
const atob = require("atob");
const router = express.Router();
const Range = require("./range.model");

router.get("/", async (req, res) => {
  // Return occupied array

  try {
    const loadedRangeObj = await Range.findOne({ id: { $eq: 123456 } });
    const existingRangeObj = Array.isArray(loadedRangeObj?.range)
      ? loadedRangeObj
      : { id: 123456, range: [{}] };

    res.json(existingRangeObj.range);
    console.log("Success!");
  } catch (err) {
    console.log(err);
    res.send(err);
  }

  /* fs.readFile("./routes/occupied-ranges.json", (err, rawData) => {
    if (err) {
      console.log(err);
      res.send(err);
      return;
    }
    const data = JSON.parse(rawData);
    res.json(data);
    console.log("Success!");
  }); */
});

router.post("/edit", logger, async (req, res) => {
  // EDIT occupied array json file
  // Some code for saving data

  const data = req.body;

  const newRange = new Range({
    id: 123456,
    range: [...(data && data.length > 0 ? data : [])],
  });

  const existingRange = await Range.findOne({ id: { $eq: 123456 } });

  if (existingRange)
    await Range.updateOne({ id: { $eq: 123456 } }, { range: newRange.range });
  else await newRange.save();

  /* const jsonData = JSON.stringify(req.body, null, 2)

     fs.writeFile('./routes/occupied-ranges.json', jsonData && jsonData.length > 0 ? jsonData : [], (err) => {
        if (err) {
            console.log(err)
            res.send(err)
            return
        }
        console.log('Success!')
    }) */
});

function logger(req, res, next) {
  // occupied/edit?name=fsdffsf&password=sfddsf&loggedin=true
  const trueName = "lucka";
  const truePassword = "Lucy2021";
  const loggedIn = req.query.loggedin;
  const name = atob(req.query.name);
  const password = atob(req.query.password);
  if (name === trueName && password === truePassword && loggedIn === true)
    return next();
  if (name === trueName && password === truePassword) {
    res.json({ loggedIn: true, message: "User logged in..." });
    next();
  } else {
    if (name !== trueName)
      return res
        .status(400)
        .json({ loggedIn: false, message: "Wrong name..." });
    if (password !== truePassword)
      return res
        .status(400)
        .json({ loggedIn: false, message: "Wrong password..." });
    res.status(400).json({ loggedIn: false, message: "Something is wrong..." });
  }
}

module.exports = router;
