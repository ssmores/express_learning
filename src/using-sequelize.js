const express = require("express");
const app = new express();

const nunjucks = require("nunjucks");
nunjucks.configure("templates", { express: app });

const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  dialect: "postgres",
  operatorAliases: false
});

const Student = sequelize.define(
  "students", 
  {
    fname: { type: Sequelize.STRING },
    lname: { type: Sequelize.STRING }
  }, 
  { timestamps: false,
    underscored: true,
    getterMethods: {
        fullName() {
            return this.fname + " " + this.lname;
        }
    }
  }
);

const Assignment = sequelize.define(
  "assignments",
  {
    title: { type: Sequelize.STRING}, 
    grade: { type: Sequelize.INTEGER}
  },
  {
    timestamps: false,
    underscored: true
  }
);

Student.hasMany(Assignment);

app.get("/", async function(req, res) {
  const students = await Student.findAll();
  return res.render("index.html", { students});
} );

app.get("/student/:id", async function(req, res) {
  const id = req.params.id;
  const student = await Student.findById(id);
  console.log("Full name is ", student.fullName);
  const assignments = await student.getAssignments();
  return res.render("student.html", { student, assignments });
});

app.listen(3012, function() {
  console.log("using the ORM hopefully on 3012");
}); 