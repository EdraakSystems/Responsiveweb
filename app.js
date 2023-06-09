const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my-database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const itemSchema = new mongoose.Schema({
  visibilityStatus: {
    type: String,
    enum: ['Published', 'Scheduled', 'Hidden'],
    default: 'Published',
  },
  publishSchedule: {
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
  },
  category: {
    type: String,
    enum: ['Clothes', 'Toys', 'Cosmetic', 'Laptop', 'Mobile', 'Watch'],
    default: 'Toys',
  },
  categoryImage: {
    type: String,
    required: true,
  },
  basicInformation: {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    productIdentifierURL: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
});

const Item = mongoose.model('Item', itemSchema);

const app = express();


app.use(express.json());

app.post('/api/items', async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      res.status(404).json({ error: 'Item not found' });
    } else {
      res.json(item);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


app.put('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!item) {
      res.status(404).json({ error: 'Item not found' });
    } else {
      res.json(item);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      res.status(404).json({ error: 'Item not found' });
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});





// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');

// // Middleware
// app.use(bodyParser.json());

// // Categories data (for demo purposes)
// let categories = [
//   { id: 1, name: 'Clothes' },
//   { id: 2, name: 'Toys' },
//   { id: 3, name: 'Cosmetic' },
//   { id: 4, name: 'Laptop' },
//   { id: 5, name: 'Mobile' },
//   { id: 6, name: 'Watch' }
// ];

// // API endpoints
// app.get('/api/categories', (req, res) => {
//   res.json(categories);
// });

// app.get('/api/categories/:categoryId', (req, res) => {
//   const categoryId = parseInt(req.params.categoryId);
//   const category = categories.find((cat) => cat.id === categoryId);
//   if (category) {
//     res.json(category);
//   } else {
//     res.status(404).json({ error: 'Category not found' });
//   }
// });

// app.post('/api/categories', (req, res) => {
//   const newCategory = req.body;
//   const existingCategory = categories.find((cat) => cat.name === newCategory.name);
//   if (existingCategory) {
//     res.status(400).json({ error: 'Category already exists' });
//   } else {
//     const categoryId = categories.length + 1;
//     const category = { id: categoryId, name: newCategory.name };
//     categories.push(category);
//     res.json(category);
//   }
// });

// app.put('/api/categories/:categoryId', (req, res) => {
//   const categoryId = parseInt(req.params.categoryId);
//   const updatedCategory = req.body;
//   const category = categories.find((cat) => cat.id === categoryId);
//   if (category) {
//     category.name = updatedCategory.name;
//     res.json(category);
//   } else {
//     res.status(404).json({ error: 'Category not found' });
//   }
// });

// app.delete('/api/categories/:categoryId', (req, res) => {
//   const categoryId = parseInt(req.params.categoryId);
//   const categoryIndex = categories.findIndex((cat) => cat.id === categoryId);
//   if (categoryIndex !== -1) {
//     categories.splice(categoryIndex, 1);
//     res.sendStatus(204);
//   } else {
//     res.status(404).json({ error: 'Category not found' });
//   }
// });

// // Start the server
// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });const express = require('express');
// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/my-database', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// const itemSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   price: Number,
// });

// const Item = mongoose.model('Item', itemSchema);

// const app = express();


// app.use(express.json());

// app.post('/api/items', async (req, res) => {
//   try {
//     const item = await Item.create(req.body);
//     res.status(201).json(item);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// app.get('/api/items', async (req, res) => {
//   try {
//     const items = await Item.find();
//     res.json(items);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// app.get('/api/items/:id', async (req, res) => {
//   try {
//     const item = await Item.findById(req.params.id);
//     if (!item) {
//       res.status(404).json({ error: 'Item not found' });
//     } else {
//       res.json(item);
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });


// app.put('/api/items/:id', async (req, res) => {
//   try {
//     const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!item) {
//       res.status(404).json({ error: 'Item not found' });
//     } else {
//       res.json(item);
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// app.delete('/api/items/:id', async (req, res) => {
//   try {
//     const item = await Item.findByIdAndDelete(req.params.id);
//     if (!item) {
//       res.status(404).json({ error: 'Item not found' });
//     } else {
//       res.sendStatus(204);
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });


// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });





// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');

// // Middleware
// app.use(bodyParser.json());

// // Categories data (for demo purposes)
// let categories = [
//   { id: 1, name: 'Clothes' },
//   { id: 2, name: 'Toys' },
//   { id: 3, name: 'Cosmetic' },
//   { id: 4, name: 'Laptop' },
//   { id: 5, name: 'Mobile' },
//   { id: 6, name: 'Watch' }
// ];

// // API endpoints
// app.get('/api/categories', (req, res) => {
//   res.json(categories);
// });

// app.get('/api/categories/:categoryId', (req, res) => {
//   const categoryId = parseInt(req.params.categoryId);
//   const category = categories.find((cat) => cat.id === categoryId);
//   if (category) {
//     res.json(category);
//   } else {
//     res.status(404).json({ error: 'Category not found' });
//   }
// });

// app.post('/api/categories', (req, res) => {
//   const newCategory = req.body;
//   const existingCategory = categories.find((cat) => cat.name === newCategory.name);
//   if (existingCategory) {
//     res.status(400).json({ error: 'Category already exists' });
//   } else {
//     const categoryId = categories.length + 1;
//     const category = { id: categoryId, name: newCategory.name };
//     categories.push(category);
//     res.json(category);
//   }
// });

// app.put('/api/categories/:categoryId', (req, res) => {
//   const categoryId = parseInt(req.params.categoryId);
//   const updatedCategory = req.body;
//   const category = categories.find((cat) => cat.id === categoryId);
//   if (category) {
//     category.name = updatedCategory.name;
//     res.json(category);
//   } else {
//     res.status(404).json({ error: 'Category not found' });
//   }
// });

// app.delete('/api/categories/:categoryId', (req, res) => {
//   const categoryId = parseInt(req.params.categoryId);
//   const categoryIndex = categories.findIndex((cat) => cat.id === categoryId);
//   if (categoryIndex !== -1) {
//     categories.splice(categoryIndex, 1);
//     res.sendStatus(204);
//   } else {
//     res.status(404).json({ error: 'Category not found' });
//   }
// });

// // Start the server
// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });