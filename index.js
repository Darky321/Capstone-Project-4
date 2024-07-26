import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const PORT = 3000;
const API_URL = "https://api.agify.io";
const app = express();
var name = "";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// 4. When the user goes to the home page it should render the index.ejs file.
//should prompt for name on homepage
app.get("/", async (req, res) => {
  res.render("index.ejs", {
    age: 0,
    name: "Whats your name",
    count: 0,
    userName: "random Name",
  });
});

//on the post / then display the number of people with that name and the expected age for that name
app.post("/", async (req, res) => {
  const names = req.body.name;
  try {
    const result = await axios.get(API_URL + `?name=${name}`);
    const val = result.data;
    res.render("index.ejs", {
      age: val.age,
      name: "Name:" + names,
      count: val.count,
      userName: names,
    });
  } catch (error) {
    console.log("Not a real name, try again");
    res.status(500);
  }
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
