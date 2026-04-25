const express = require("express");
const app = express();

app.use(express.json());

let database = {};

app.post("/save", (req, res) => {
    const { userId, exp, lv, PlayTime, KillasSCP, SCPKill, PlayerKill, PlayerDeath, Badge_ContainmentSpecialist, Badge_CIProperty} = req.body;

    database[userId] = { 
        exp: exp,
        lv: lv,
		PlayTime: PlayTime,
        KillasSCP: KillasSCP,
        SCPKill: SCPKill,
		PlayerKill: PlayerKill,
        PlayerDeath: PlayerDeath,
        Badge_ContainmentSpecialist: Badge_ContainmentSpecialist,
		Badge_CIProperty: Badge_CIProperty
                       };

    console.log("Saved:", userId, database[userId]);

    res.send({ status: "saved" });
});

app.get("/load/:userId", (req, res) => {
    const userId = req.params.userId;

    const data = database[userId] || { exp: 0, lv: 0, PlayTime: 0, KillasSCP: 0, SCPKill: 0, PlayerKill: 0, PlayerDeath: 0, Badge_ContainmentSpecialist: false, Badge_CIProperty: false};

    res.send(data);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
