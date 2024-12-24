const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/cafeteria', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Schemas and Models
const UserSchema = new mongoose.Schema({
  userName: String,
  password: String,
  isAdmin: Boolean,
});

const AdminSchema = new mongoose.Schema({
  adminNumber: String,
  adminPassword: String,
});

const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  cafeteria: String,
});

const OrderSchema = new mongoose.Schema({
  tokenNumber: { type: Number, required: true },
  userName: { type: String, required: true },
  items: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);
const Admin = mongoose.model('Admin', AdminSchema);
const Item = mongoose.model('Item', ItemSchema);
const Order = mongoose.model('Order', OrderSchema);

// Routes
app.post('/login', async (req, res) => {
  const { userName, password } = req.body;
  console.log(`Login attempt for user: ${userName}`);
  const user = await User.findOne({ userName, password });
  if (user) {
    res.json({ success: true, userName: user.userName, isAdmin: user.isAdmin });
  } else {
    res.json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/admin-login', async (req, res) => {
  const { adminNumber, adminPassword } = req.body;
  console.log(`Admin login attempt for admin number: ${adminNumber}`);
  const admin = await Admin.findOne({ adminNumber, adminPassword });
  if (admin) {
    console.log('Admin found:', admin);
    res.json({ success: true });
  } else {
    console.log('Admin not found');
    res.json({ success: false, message: 'Invalid admin number or password' });
  }
});

app.get('/items', async (req, res) => {
  const items = await Item.find();
  const cafeteriaMenus = items.reduce((acc, item) => {
    if (!acc[item.cafeteria]) {
      acc[item.cafeteria] = [];
    }
    acc[item.cafeteria].push(item);
    return acc;
  }, {});
  res.json(cafeteriaMenus);
});

app.post('/add-item', async (req, res) => {
  const { cafeteria, name, description, price } = req.body;
  const newItem = new Item({ cafeteria, name, description, price });
  await newItem.save();
  res.json({ success: true, item: newItem });
});

app.delete('/delete-item/:id', async (req, res) => {
  const { id } = req.params;
  await Item.findByIdAndDelete(id);
  res.json({ success: true });
});

// Endpoint to handle order submissions
app.post('/orders', async (req, res) => {
  try {
    const { tokenNumber, userName, items, totalPrice } = req.body;
    const newOrder = new Order({ tokenNumber, userName, items, totalPrice });
    await newOrder.save();
    res.status(201).json({ success: true, message: 'Order saved successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to save order', error });
  }
});

// Endpoint to fetch all orders
app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders', error });
  }
});

// Endpoint to delete an order
app.delete('/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete order', error });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});