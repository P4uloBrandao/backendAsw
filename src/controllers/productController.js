const Product = require('../models/ProductsShema');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
    const product = new Product({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      type: req.body.type,
      size: req.body.size,
      brand: req.body.brand,
      condition: req.body.condition,
      price: req.body.price,
      photos: req.body.photos,
      seller: req.user._id,
    });
    try {
      const newProduct = await product.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await product.remove();
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//filtrar produtos com  varios ao mesmo tempo
exports.getProducts = async (req, res) => {
    const filters = {};
    if (req.query.title) {
      filters.title = req.query.title;
    }
    if (req.query.description) {
      filters.description = req.query.description;
    }
    if (req.query.category) {
      filters.category = req.query.category;
    }
    if (req.query.type) {
      filters.type = req.query.type;
    }
    if (req.query.size) {
      filters.size = req.query.size;
    }
    if (req.query.brand) {
      filters.brand = req.query.brand;
    }
    if (req.query.condition) {
      filters.condition = req.query.condition;
    }
    if (req.query.price) {
      filters.price = req.query.price;
    }
    if (req.query.seller) {
      filters.seller = req.query.seller;
    }
  
    try {
      const products = await Product.find({
        $and: [filters]
      });
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  