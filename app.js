//jshint esversion:6
//localhost/compose to compose the blog post!
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require("mongoose");

//db stuff
//run mongoatlas shell !
const uri = "mongodb+srv://aakash-admin:skyyjaan@cluster0.xbhj9.mongodb.net/blogDB?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true
});
//TODO : remove password
//schema
const postSchema = {

  title: String,

  content: String

};
const Post = mongoose.model("Post", postSchema);


const homeStartingContent = "Hi, I am Aakash. Welcome to my Blog Site";
const aboutContent = "Hi, My name is Aakash Jangid and I am a Full Stack Developer from India. I have a passion for building web and mobile application from scratch to production. Please have a look at my project portfolio on my github at https://github.com/aakashjangidme";
const contactContent = "Hi, My name is Aakash Jangid and I am a Full Stack Developer from India. You can reach me out on contact@beatsgram.studio";

const app = express();

// posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


app.get('/', function(req, res) {

  Post.find({}, function(err, posts) {

    res.render("home", {

      startingContent: homeStartingContent,
      posts: posts
    });
  });

  // res.render('home', {
  //   posts : posts
  // });
});

app.get('/about', function(req, res) {

  res.render('about', {
    aboutContent: aboutContent,
  });
});

app.get('/contact', function(req, res) {

  res.render('contact', {
    contactContent: contactContent,
  });
});

app.get('/contact', function(req, res) {

  res.render('contact', {
    contactContent: contactContent,
  });
});


app.get('/compose', function(req, res) {

  res.render('compose', );
});

app.post('/compose', function(req, res) {
  const post = new Post({

    title: req.body.postTitle,

    content: req.body.postText,

  });

  // const post = {
  //   title : req.body.postTitle,
  //   content : req.body.postText,
  // };

  // posts.push(post);
  post.save(function(err) {

    if (!err) {

      res.redirect("/");

    }

  });

});


app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
