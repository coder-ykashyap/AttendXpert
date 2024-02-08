const express = require("express");
const app = express();
const port = process.env.PORT || 3000; // Use the provided PORT or default to 3000
const runPuppeteer = require("./algorithm");
const send_email = require("./mailer");
const bodyParser = require("body-parser");
const display = require("./display");
const cors = require("cors");
const decrypt = require("./decrypt")

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/attendance", async (req, res) => {
  console.log(req.body.username, req.body.password, req.body.email, req.body.option);
  if (!req.body.username || !req.body.password || !req.body.email || !req.body.option) {
    res.send("No Credentials Found");
    return 0;
  }

  var {username, password,email,semoption} = decrypt({
    "username" :  req.body.username,
    "password": req.body.password,
    "email": req.body.email,
    "semoption": req.body.option
  })


  console.log(username,password,email,semoption)

  try {
    var result = await runPuppeteer(username, password,semoption);
  } catch (err) {
    res.status(401).send({ Error: err });
    return 0;
  }
  // console.log("result = >",result);
  
  // const report = await display(result);
  // // console.log("report => ",report);
  
  // await send_email(email,report)
  
  // Display the result using the display function
  
  try{
    var report = await display(result);
  }
  catch(err){
    console.log(err);
    res.send({"Error" : err})
    return 0;
  }
  
  // Send an email with the report
  try{
    await send_email(email, report);
  }
  catch(err){
    console.log(err);
    res.send({"Error" : err})
    return 0;
  }
  res.send({ message: "Success" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
