// APAN NE DATA INITIALIZE KARLIY HAI KI AGAR KABHI DATA KHALI HO TO APAN KUCH YAHA SE UTHA SAKTE HAI 
const mongoose = require("mongoose");
const Chat = require("./models/chat");

main()
.then(() => {
    console.log("Connection Successful");
})
.catch((err) =>{
    console.log(err);
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allchats= [{
    from : "venky",
    to: "vk",
    msg: "hi",
    date: new Date(),
},
{
    from : "v",
    to: "v",
    msg: "h",
    date: new Date(),

},

{
    from : "k",
    to: "vk",
    msg: "i",
    date: new Date(),
}

];

Chat.insertMany(allchats);

