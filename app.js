import express from "express";
import dotenv from "dotenv";
import * as utils from "./utils/utils.js";
dotenv.config();

const app = express();
const port = 3000;

app.use(express.static("public"));

// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });

app.use(express.json());

app.post("/mail", async (req, res) => {   // ending as /mail in my link
  await utils
  .sendMessage(req.body.sub, req.body.txt)
  .then(() => {
    res.send({ result: "Message sent!" });
    })
    .catch((err) => {
        console.error("sendMessage failed:", err);
        res.send({ result: "Message not sent." });
    });
});

app.listen(port, () => {
    //console.log(process.env.SENSITIVE_INFO);
    console.log(`Example app listening on port ${port}`);
});
