const express = require("express");
const app = express();

app.use(express.json());

// fake database (replace later with real DB)
let database = {};

// SAVE player data
app.post("/save", (req, res) => {
    const { userId, exp } = req.body;

    database[userId] = { exp };

    res.send({ status: "saved" });
});

// LOAD player data
app.get("/load/:userId", (req, res) => {
    const userId = req.params.userId;

    res.send(database[userId] || { exp: 0 });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
