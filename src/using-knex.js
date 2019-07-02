const express = require("express");
const app = new express();

const nunjucks = require("nunjucks");
nunjucks.configure("templates", { express : app});

const knex = require("knex") ({
    client: "pg",
    connection: { host: "127.0.0.1" }
});

app.get("/", async function(req, res) {
    const students = await knex.select("id", "fname", "lname").from("students");
    return res.render("index.html", { students });
});

app.get("/student/:id", async function(req, res) {
    const id = req.params.id;
    const student = await knex
        .first("fname", "lname")
        .from("students")
        .where("id", id);
    const assignments = await knex
        .select("title", "grade")
        .from("assignments")
        .where("student_id", id);
    return res.render("student.html", { student, assignments });
});

app.listen(3011, function() {
    console.log("using knex on port 3011");
});