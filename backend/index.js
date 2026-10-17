import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.get("/help",(req,res)=>{
    console.log("came here")
    res.send("you are helped");
})

app.listen(port, () => {
  console.log(`server started at ${port}`);
});
