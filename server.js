const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());

// MongoDB connection
const client = new MongoClient(process.env.MONGO_URI);

let collection;

// connect to database
async function start() {
    try {
        await client.connect();
        const db = client.db("game");
        collection = db.collection("players");

        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("DB connection error:", err);
    }
}
start();

// default data (VERY IMPORTANT)
const defaultData = {
    exp: 0,
    lv: 1,
    PlayTime: 0,
    KillasSCP: 0,
    SCPKill: 0,
    PlayerKill: 0,
    PlayerDeath: 0,
    Badge_ContainmentSpecialist: false,
    Badge_CIProperty: false
};

// SAVE
app.post("/save", async (req, res) => {
    try {
        const { userId, ...rest } = req.body;

        if (!userId) {
            return res.status(400).json({ error: "Missing userId" });
        }

        await collection.updateOne(
            { userId: userId },
            { $set: rest },
            { upsert: true }
        );

        console.log("Saved:", userId, rest);

        res.json({ status: "saved" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Save failed" });
    }
});

// LOAD
app.get("/load/:userId", async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);

        let data = await collection.findOne({ userId });

        // merge with defaults (prevents missing fields)
        data = {
            ...defaultData,
            ...data
        };

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Load failed" });
    }
});

// PORT FIX (important for Render)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
