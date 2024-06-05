// const express = require('express');
// const Checkout = require('../model/Checkout');
// const router = express.Router();
// const checkoutController = require('../controllers/checkoutControllers');
// router.get('/', checkoutController.getCheckoutByEmail);
// router.post('/', checkoutController.addItemToCheckout);
// router.get('/transactions', checkoutController.getAllTransactions); 

// // router deleteDeleteTransaction
// router.delete('/:id', checkoutController.DeleteTransaction);
// // get single menu ite
// router.get('/:id', checkoutController.singleMenuItem); 

// router.patch('/:id', checkoutController.updateTransactionItem)

// module.exports = router;

const express = require('express');
const Checkout = require('../model/Checkout');
const router = express.Router();
const checkoutController = require('../controllers/checkoutControllers');

router.get('/', checkoutController.getCheckoutByEmail);
router.post('/', checkoutController.addItemToCheckout);
router.get('/transactions', checkoutController.getAllTransactions); 
router.delete('/:id', checkoutController.DeleteTransaction);
router.get('/:id', checkoutController.singleMenuItem); 
router.patch('/:id', checkoutController.updateTransactionItem) // Here's the issue

module.exports = router;
