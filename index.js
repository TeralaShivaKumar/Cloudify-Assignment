/**Importing Required Modules */
const { response } = require("express");
const express=require("express");
const path=require("path");
const { request } = require("http");
const bodyparser=require('body-parser');
const fetch = require('node-fetch');

/**Initializing the Server */
const app=express();
app.use(express.json());
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended: true}));


/**Landing Page's Route */
app.get("/",(request,response)=>{
    response.sendFile('./index.html',{root:__dirname});
})


/** Business Logic and Network Calls */
app.post("/details",(request,response)=>{
    const trelloCardName=request.body.name;
    const trelloCardDescription=request.body.description;
    const trelloCardDueDate=request.body.dueDate;
    const trelloCardStartDate=request.body.startDate;

    fetch(`https://api.trello.com/1/cards?idList=640655916a15a56eedfb9c73&name=${trelloCardName}&desc=${trelloCardDescription}&start=${trelloCardStartDate}&due=${trelloCardDueDate}&key=fdb5d40fbf8a782110da3d7359ed9174&token=ATTAb112208020156bc2e7a1cfe23bcebdd494e997df9a6387e9d80ca0bde70e64dc58F67918`, {
    method: 'POST',
    headers: {
        'Accept': 'application/json'
    }
    })
    .then(response => {
        return response;
    })
    .then(response.redirect('/added'))
    .catch(err => console.error(err));
})

app.get("/added",(request,response)=>{
    response.sendFile("./public/thankyou.html",{root:__dirname});
})


/**Starting the server at port 3000 */
app.listen(3000,()=>{
    console.log("Server Running at http://localhost:3000 ");
});


























        // const dbPath=path.join(__dirname,"mydb.db");

// let db=null;

// const initialiazeDBAndServer=async ()=>{
//     try{
//     db=await open({
//         filename:dbPath,
//         driver:sqlite.Database
//     })

//     app.listen(3000,()=>{
//         console.log("Server Running at http://localhost:3000 ");
//     });

// }catch(e){
//     console.group(`Error ${e.message}`);
//     process.exit(1);
// }
// }

// app.get("/page",(request,response)=>{
//     // let date=new Date();
//     response.sendFile('./page.html',{root:__dirname});
// });

// initialiazeDBAndServer();