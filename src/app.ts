import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import path from "path";
import { postTitleToURL } from "./global";
import { truncateString } from "./global";

interface Post {
	title: string;
	text: string;
}
// const posts: Post[] = [];
const postsMap: Map<string, Post> = new Map();

const homeStartingContent =
	"Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
	"Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
	"Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
//express settings and configuration.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public"))); //everything on public dir will be static avaible to the client
app.set("view engine", "ejs"); //setting the view engine of the application to ejs.
app.set("views", path.join(__dirname, "/views")); // setting the app to look for the views dir on the correct dir
//--------------------------------------
//Home page
app.get("/", (req, res) => {
	res.render("home", {
		homeStartingContent: homeStartingContent,
		posts: postsMap,
		truncateString: truncateString,
		postTitleToURL: postTitleToURL,
	});
});
//About page
app.get("/about", (req, res) => {
	res.render("about", { aboutContent: aboutContent });
});
//Contact page
app.get("/contact", (req, res) => {
	res.render("contact", { contactContent: contactContent });
});
//Compose page
app.get("/compose", (req, res) => {
	res.render("compose");
});
app.post("/compose", (req, res) => {
	const newPost: Post = {
		title: req.body.postTitle,
		text: req.body.postText,
	};
	postsMap.set(postTitleToURL(newPost.title), newPost);
	// posts.push(newPost);
	console.log(postsMap);

	res.redirect("/");
});
//Posts routing
app.get("/posts/:postID", (req, res) => {
	console.log(req.params.postID);
	if (postsMap.has(req.params.postID)) {
		res.render("post", { post: postsMap.get(req.params.postID) });
	} else {
		res.render("error404");
	}
});
//--------------------------------------
// server listening on port 3000
app.listen(3000, () => {
	console.log("Server listening on port 3000");
});
