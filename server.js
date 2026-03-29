<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Orders</title>

    <style>
        body {
            font-family: Arial;
            padding: 20px;
            background: #f5f7fa;
        }

        h2 {
            text-align: center;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            background: white;
        }

        th, td {
            padding: 10px;
            border: 1px solid #ccc;
            text-align: center;
        }

        th {
            background: #2563eb;
            color: white;
        }
    </style>
</head>

<body>

<h2>Orders List</h2>

<table>
    <thead>
        <tr>
            <th>File</th>
            <th>Pages</th>
            <th>Selected Pages</th>
            <th>Copies</th>
            <th>Type</th>
            <th>Price</th>
            <th>Date</th>
        </tr>
    </thead>
    <tbody id="ordersTable"></tbody>
</table>

<script>
async function loadOrders() {
    try {
        const res = await fetch("https://print-module-w45w.onrender.com/orders");
        const orders = await res.json();

        const table = document.getElementById("ordersTable");
        table.innerHTML = "";

        if (orders.length === 0) {
            table.innerHTML = "<tr><td colspan='7'>No orders found</td></tr>";
            return;
        }

        orders.forEach(order => {
            const row = `
                <tr>
                    <td>${order.fileName}</td>
                    <td>${order.pages}</td>
                    <td>${order.pageRange || "All"}</td>
                    <td>${order.copies}</td>
                    <td>${order.type}</td>
                    <td>₹${order.price}</td>
                    <td>${new Date(order.date).toLocaleString()}</td>
                </tr>
            `;
            table.innerHTML += row;
        });

    } catch (err) {
        console.error(err);
        alert("Failed to load orders");
    }
}

loadOrders();
</script>

</body>
</html>
