const express = require("express");
const app = express();

app.use(express.json());

// default command
let currentCommand = { command: "none" };

// when Roblox asks for command
app.get("/command", (req, res) => {
    res.json(currentCommand);
});

// when YOU change command
app.post("/set", (req, res) => {
    currentCommand = req.body;
    res.send("Command updated");
});

// start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});