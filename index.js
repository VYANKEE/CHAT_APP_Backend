const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// DB Connection
main()
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// Routes
app.get("/", (req, res) => {
  res.send("Root is ready");
});

app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
});

app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/chats", async (req, res) => {
  let { from, msg, to } = req.body;
  let newChat = new Chat({
    from,
    msg,
    to,
    date: new Date(),
  });

  newChat.save().then(()=>
    {console.log("Saved successfully");
    res.redirect("/chats");})
    
});

app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

// UPDATE route
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg } = req.body;

  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { msg },
    { runValidators: true, new: true }
  );
  console.log("Updated Chat:", updatedChat);
  res.redirect("/chats");
});

// DELETE msg 
app.delete("/chats/:id", async (req,res) =>{
  let {id} = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats");
})

let port = 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
