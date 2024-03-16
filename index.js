const express = require("express");

const app = express();
app.use(express.json());

const port = 3000;

app.listen(port, () => {
  console.log(`HTTP sever is listening on port ${port}`);
});

const users = [
  {
    name: "John",
    kidneys: [
      {
        side: "left",
        healthy: false,
      },
    ],
  },
];

app.get("/", (req, res) => {
  const johnKidneys = users[0].kidneys;
  const numberOfKidneys = johnKidneys.length;
  let numberOfHealthyKidneys = 0;
  for (let i = 0; i < johnKidneys.length; i++) {
    if (johnKidneys[i].healthy) {
      numberOfHealthyKidneys++;
    }
  }
  const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
  res.json({
    numberOfKidneys,
    numberOfHealthyKidneys,
    numberOfUnhealthyKidneys,
  });
});

app.post("/", (req, res) => {
  johnKidneys = users[0].kidneys;
  if (johnKidneys.length === 2) {
    res.send("You already have two kidneys");
    return;
  }

  const isHealthy = req.body.isHealthy;
  const side = johnKidneys[0].side === "left" ? "right" : "left";
  johnKidneys.push({ healthy: isHealthy, side });
  res.json({ msg: "DONE!" });
  console.log(users[0].kidneys);
});

app.put("/", (req, res) => {
  johnKidneys = users[0].kidneys;
  for (let i = 0; i < johnKidneys.length; i++) {
    johnKidneys[i].healthy = true;
  }
  console.log(johnKidneys);
  res.send("all kidneys are healthy");
});

app.delete("/", (req, res) => {
  johnKidneys = users[0].kidneys;
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (!johnKidneys[i].healthy) {
      johnKidneys[i].healthy = true;
    }
  }
  console.log(johnKidneys);
  res.send("DONE!");
});
