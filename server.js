const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

// ✅ TEMP STORAGE (in memory)
let orders = [];

// ✅ TEST ROUTE
app.get("/", (req, res) => {
    res.send("Backend is running ✅");
});

// ✅ SAVE ORDER
app.post("/upload", upload.single("file"), (req, res) => {
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

    orders.push(order);

    console.log("Saved:", order);

    res.json({ message: "Order saved successfully ✅" });
});

// ✅ GET ORDERS
app.get("/orders", (req, res) => {
    res.json(orders);
});

// ✅ PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
