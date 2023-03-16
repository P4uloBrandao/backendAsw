const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.get('/filteredBy', productController.getProducts);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.post('/category', productController.createCategoria);
router.delete('/category/:id', productController.deleteCategoria);
router.post('/marca',productController.createMarca);
router.delete('/marcas/:id',productController.deleteMarca);
router.get('/categories', productController.getAllCategories);
router.get('/marcas', productController.getAllBrands);

module.exports = router;
