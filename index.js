const express = require("express");
const pool = require("./db");

const app = express();
app.use(express.json());

//retrieve all data

app.get("/", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM emp");
    res.status(200).send(data.rows);
  } catch (er) {
    res.status(500).send({
      error: "some error occurred in retrieving data",
    });
  }
});

//insert data

app.post("/insert", async (req, res) => {
  const { name, location } = req.body;
  try {
    await pool.query("INSERT INTO emp (name,address) VALUES ($1,$2)", [
      name,
      location,
    ]);
    res.status(200).send({
      message: "data inserted successfully",
    });
  } catch (er) {
    res.status(500).send({
      error: "cannot insert data right now",
    });
  }
});

//update data

app.put("/update", async (req, res) => {
  try {
    const { name, location } = req.body;
    await pool.query("UPDATE emp SET address = $1 WHERE name = $2", [
      location,
      name,
    ]);
    res.status(200).send({
      message: "updated data successfully",
    });
  } catch (er) {
    console.log(er);
    res.status(500).send({
      error: "cannot update data successfully",
    });
  }
});

//delete data

app.delete("/delete", async (req, res) => {
  try {
    const { name } = req.body;
    await pool.query("DELETE FROM emp where name = $1", [name]);
    res.status(200).send({
      message: "data deleted successfully",
    });
  } catch (er) {
    res.status(500).send({
      error: "error deleting data",
    });
  }
});

//delete all data

app.delete("/deleteAll", async (req, res) => {
  try {
    await pool.query("TRUNCATE TABLE emp");
    res.status(200).send({
      message: "deleted all data successfully",
    });
  } catch (er) {
    console.log(er);
    res.status(500).send({
      error: "unable to delete all data",
    });
  }
});

//create table

app.get("/setup", async (req, res) => {
  try {
    await pool.query(
      "CREATE TABLE emp(id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))"
    );
    res.status(200).send({
      message: "database created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "error in creating database",
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("server is running on PORT ", PORT));
