const express = require("express");
const app = express();

app.use(express.json());

let database = {};

app.post("/save", (req, res) => {
    const { userId, hp } = req.body;

    database[userId] = { hp };

    console.log("Saved:", userId, database[userId]);

    res.send({ status: "saved" });
});

app.get("/load/:userId", (req, res) => {
    const userId = req.params.userId;

    const data = database[userId] || { hp: 100 };

    res.send(data);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
