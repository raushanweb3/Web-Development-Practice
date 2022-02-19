const express = require("express");
const app = express();
const port = 8080;

app.use((req, res) => {
    console.log("We got a new request!!");
    // console.dir(req);
    // res.send("Here's your 1st response");
    res.send({ color: "red", type: "2nd response"});
})

app.listen(port, () => {
    console.log(`Server started at ${port}`);
})