import express from "express";
import dotenv from "dotenv";
import * as utils from "./utils/utils.js";
dotenv.config();
import * as db from "./utils/database.js";
let data = ["Project 1", "Project 2", "Project 3"];
let projects = [];

const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));

app.get("/", async (req, res, next) => {
  try {
    await db.connect();
    projects = await db.getAllProjects();

    // Pick a random project for the featured section
    const randomIndex = Math.floor(Math.random() * projects.length);
    const featured = projects[randomIndex];

    res.render("index.ejs", {
      projectArray: projects,
      featured: featured
    });
  } catch (err) {
    next(err);
  }
});

app.get("/projects", (req, res) => {
 res.render("projects.ejs", {projectArray: projects});
});

app.get("/project/:id", async (req, res, next) => {
  try {
    await db.connect();
    const allProjects = await db.getAllProjects();
    const id = parseInt(req.params.id, 10);
    const project = allProjects.find(p => p.id === id);

    if (!project) {
      throw new Error("No project with that ID");
    }

    res.render("project.ejs", { project });
  } catch (err) {
    next(err);
  }
});

app.get("/index", (req, res) => {
  res.render("index.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.post("/mail", async (req, res) => {
  await utils
    .sendMessage(req.body.sub, req.body.txt)
    .then(() => {
      res.send({ result: "success" });
    })
    .catch((err) => {
      console.error("sendMessage failed:", err);
      res.send({ result: "failure" });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use((err, req, res, next) => {
  console.log(err);
  if (res.headersSent) return next(err);   // ← add this line
  let msg = err.message;
  if (msg !== "No project with that ID") {
    msg = "There was an internal error. Apologies. We are working on cleaning up the mess.";
  }
  res.render("error.ejs", { msg: msg });
});