const express = require("express");
const app = express();
const port = 3000;
const bodyparser = require("body-parser");
const cors = require("cors");

app.use(bodyparser());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const model = require("./models").users;
app.get("/users", async (req, res) => {
  const result = await model.findAll({
    attributes: ["id", "username"],
  });
  return res.json(result);
});

app.post("/users", async (req, res) => {
  const { username } = req.body;
  const result = await model.create({
    username,
  });
  return res.json(result);
});

const cobas = require("./models").cobas;
app.post("/coba", async (req, res) => {
  const { username, age, status } = req.body;
  const result = await cobas.create({
    username,
    age,
    status,
  });
  return res.json(result);
});

app.put("/coba", async (req, res) => {
  const { username, age, status } = req.body;
  const upd = await cobas.update(
    {
      username,
      age,
      status,
    },
    {
      where: {
        id: 1,
      },
    }
  );
  return res.json(upd);
});

app.get("/coba/:id", async (req, res) => {
  const { id } = req.params;
  const result = await cobas.findOne({
    where: {
      id,
    },
  });
  return res.json(result);
});

app.get("/coba", async (req, res) => {
  const result = await cobas.findAll();
  return res.json(result);
});

app.delete("/coba", async (req, res) => {
  const { id } = req.body;
  const result = await cobas.findOne({
    where: {
      id,
    },
  });

  if (!result) {
    return res.status(404).json("data not found!!!");
  } else {
    const del = await result.destroy();

    return res.json(del);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
