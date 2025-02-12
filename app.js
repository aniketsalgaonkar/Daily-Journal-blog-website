//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/dailyJournalDB");       // this is connect to local mongodb ,you can connect it to mongo atlas by replacing the driver link 

 // -----------  error ----------- (if below error appears then start mongosh shell link in cmd to connect atlas)
  //   const err = new MongooseError(message);
  //   ^
  // MongooseError: Operation `posts.find()` buffering timed out after 10000ms


const dailyjournalschema = {
  title: String,
  post: String,
};

const Post = mongoose.model("Post", dailyjournalschema);

// day1.save();

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// var homePagePostArray = [];

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  Post.find({}).then(function (posts) {
    res.render("home", {
      homeStartingContent: homeStartingContent,
      postArray: posts,
    });
  });
});

app.post("/", function (req, res) {});

app.get("/contact", function (req, res) {
  res.render("contact", {
    contactContent: contactContent,
  });
});

app.post("/contact", function (req, res) {});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.post("/about", function (req, res) {});

app.get("/compose", function (req, res) {
  res.render("compose", {});
});

app.post("/compose", function (req, res) {
  const postContent = new Post({
    title: req.body.title,
    post: req.body.post,
  });
  postContent.save();

  res.redirect("/");
});

app.get("/posts/:postId", function (req, res) {
  const requestedPostId = req.params.postId.trim();

  Post.findOne({ _id: requestedPostId }).then(function (post) {
    res.render("post", {
      title: post.title,
      description: post.post,
    });
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
