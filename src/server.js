const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

let products = [
  { id: 1, name: "Laptop", price: 55000, category: "Electronics" },
  { id: 2, name: "Headphones", price: 2500, category: "Accessories" },
  { id: 3, name: "Keyboard", price: 1200, category: "Accessories" }
];
let nextId = 4;

app.get("/", (req, res) => res.json({ message: "Automated API Testing Project is running" }));
app.get("/health", (req, res) => res.status(200).json({ status: "OK", service: "Product API" }));
app.get("/api/products", (req, res) => res.status(200).json({ success: true, count: products.length, data: products }));

app.get("/api/products/:id", (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ success: false, message: "Product not found" });
  res.status(200).json({ success: true, data: product });
});

app.post("/api/products", (req, res) => {
  const { name, price, category } = req.body;
  if (!name || typeof name !== "string" || typeof price !== "number" || price <= 0 || !category)
    return res.status(400).json({ success: false, message: "Valid name, positive numeric price, and category are required" });
  const product = { id: nextId++, name: name.trim(), price, category };
  products.push(product);
  res.status(201).json({ success: true, message: "Product created", data: product });
});

app.put("/api/products/:id", (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ success: false, message: "Product not found" });
  const { name, price, category } = req.body;
  if (name !== undefined) {
    if (typeof name !== "string" || !name.trim()) return res.status(400).json({ success: false, message: "Name must be a non-empty string" });
    product.name = name.trim();
  }
  if (price !== undefined) {
    if (typeof price !== "number" || price <= 0) return res.status(400).json({ success: false, message: "Price must be positive" });
    product.price = price;
  }
  if (category !== undefined) product.category = category;
  res.status(200).json({ success: true, message: "Product updated", data: product });
});

app.delete("/api/products/:id", (req, res) => {
  const index = products.findIndex(p => p.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: "Product not found" });
  const deleted = products.splice(index, 1)[0];
  res.status(200).json({ success: true, message: "Product deleted", data: deleted });
});

app.use((req, res) => res.status(404).json({ success: false, message: "Route not found" }));
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err)
    return res.status(400).json({ success: false, message: "Invalid JSON body" });
  console.error(err);
  res.status(500).json({ success: false, message: "Internal server error" });
});
app.listen(PORT, () => console.log(`Product API running at http://localhost:${PORT}`));
