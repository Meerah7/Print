const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");

const app = express();

// ✅ Only ONE upload
const upload = multer({ dest: "uploads/" });

// ✅ CORS
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

// ✅ Root route
app.get("/", (req, res) => {
    res.send("Backend is running ✅");
});

// ✅ SAVE ORDER
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

        // ✅ Save to file
        let orders = [];

        if (fs.existsSync("orders.json")) {
            orders = JSON.parse(fs.readFileSync("orders.json"));
        }

        orders.push(order);

        fs.writeFileSync("orders.json", JSON.stringify(orders, null, 2));

        res.json({ message: "Order saved successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ GET ORDERS
app.get("/orders", (req, res) => {
    if (!fs.existsSync("orders.json")) {
        return res.json([]);
    }

    const data = JSON.parse(fs.readFileSync("orders.json"));
    res.json(data);
});

// ✅ ONLY ONE LISTEN (IMPORTANT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
