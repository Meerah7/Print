const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "uploads/" });
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));
app.get("/", (req, res) => {
    res.send("Backend is running ✅");
});

const upload = multer({ dest: "uploads/" });

// SAVE ORDER
app.post("/upload", upload.single("file"), (req, res) => {
    try {
        const { pages, copies, type, price, pageRange } = req.body;

        const order = {
            fileName: req.file.originalname,
            pages,
            pageRange,
            copies,
            type,
            price,
            date: new Date()
        };

        console.log(order);

        res.json({ message: "Order saved successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ PORT (RENDER FIX)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});

// GET ORDERS
app.get("/orders", (req, res) => {

    if (!fs.existsSync("orders.json")) {
        return res.json([]);
    }

    const data = JSON.parse(fs.readFileSync("orders.json"));
    res.json(data);
});

app.listen(5000, () => console.log("Server running on port 5000"));