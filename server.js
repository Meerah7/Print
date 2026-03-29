const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");

const app = express();

// ✅ MONGODB CONNECTION
mongoose.connect("YOUR_MONGODB_URL")
    .then(() => console.log("MongoDB Connected ✅"))
    .catch(err => console.log(err));

// ✅ MIDDLEWARE
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// ✅ FILE UPLOAD SETUP
const upload = multer({ dest: "uploads/" });

// ✅ SCHEMA
const orderSchema = new mongoose.Schema({
    fileName: String,
    pages: Number,
    pageRange: String,
    copies: Number,
    type: String,
    price: Number,
    date: Date
});

const Order = mongoose.model("Order", orderSchema);

// ✅ ROOT ROUTE (FOR TEST)
app.get("/", (req, res) => {
    res.send("Backend is running ✅");
});

// ✅ SAVE ORDER
app.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const { pages, copies, type, price, pageRange } = req.body;

        const newOrder = new Order({
            fileName: req.file.originalname,
            pages,
            pageRange,
            copies,
            type,
            price,
            date: new Date()
        });

        await newOrder.save();

        res.json({ message: "Order saved successfully ✅" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error ❌" });
    }
});

// ✅ GET ALL ORDERS
app.get("/orders", async (req, res) => {
    try {
        const orders = await Order.find().sort({ date: -1 });
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching orders" });
    }
});

// ✅ PORT (RENDER FIX)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
