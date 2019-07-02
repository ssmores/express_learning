const express = require("express");
const app = new express();

const nunjucks = require("nunjucks");
nunjucks.configure("templates", { express: app });

const { Client } = require("pg");
const client = new Client();

client.connect();

app.get("/", async function(req, res) {
  const rez = await client.query("SELECT id, fname, lname FROM students");
  const students = rez.rows;
  return res.render("index.html", { students });
});

app.get("/student/:id", async function(req, res) {
  const id = req.params.id;
  const rez = await client.query(
    "SELECT fname, lname FROM students WHERE id=$1", 
    [id]
  );
  const student = rez.rows[0];
  const rez2 = await client.query(
    "SELECT title, grade FROM assignments WHERE student_id=$1", 
    [id]
  );
  const assignments = rez2.rows;
  return res.render("student.html", { student, assignments });
});

app.listen(3010, function() {
  console.log("Listening on 3010!");
});