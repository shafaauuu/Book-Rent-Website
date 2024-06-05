const { Transaction } = require("mongodb");
const Checkout = require("../model/Checkout");
const { checkout } = require("../routes/menuRouters");

const getCheckoutByEmail = async (req, res) => {
    try {
        const email = req.query.email;
        const query = { email: email };
        const result = await Checkout.find(query).exec();
        res.status(200).json(result);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: error.message });
    }
};

const addItemToCheckout = async (req, res) => {
    const checkoutItems = req.body; // Assuming you send an array of checkout items
  
    try {
        // Add return date to each checkout item
        checkoutItems.forEach(item => {
          const transaction_date = new Date(item.transaction_date);
          const returnDate = new Date(transaction_date);
          returnDate.setDate(transaction_date.getDate() + 7); // Add 7 days
    
          // Set the time to a fixed value (e.g., 9:29:16 AM)
          returnDate.setHours(9, 29, 16, 188); 
    
          item.returnDate = returnDate;
        });
    
        const createdItems = await Checkout.insertMany(checkoutItems);
        res.status(201).json(createdItems);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: error.message });
    }
  };
  const getAllTransactions = async (req, res) => {
    try {
       const transactions = await Checkout.find({}).sort({ transaction_date: -1 });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// delete trans   

const DeleteTransaction = async (req, res) => {
  const checkoutItemId = req.params.id;
  try {
    const deletedTransaction = await Checkout.findByIdAndDelete(checkoutItemId);
    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// get single menu item 
const singleMenuItem = async (req, res) => {
  const checkoutItemId = req.params.id;
  try {
    const transaction = await Checkout.findById(checkoutItemId)
    res.status(200).json({transaction});
    
  } catch (error) {
    res.status(500).json({ message: error.message });
    
  }
};


// update methods

const updateTransactionItem = async (req, res) => {
  const checkoutItemId = req.params.id;
  const { Title, price, penalty, status } = req.body;
  
  try {
    const updateTransaction = await Checkout.findByIdAndUpdate(checkoutItemId, { Title, price, penalty, status }, { new: true, runValidators: true });
    
    if (!updateTransaction)
      return res.status(404).json({ message: "Transaction not found" });

    // Jika transaksi berhasil diperbarui, kirim respons dengan status 200 dan data transaksi yang diperbarui
    res.status(200).json({ updateTransaction });
  } catch (error) {
    // Jika terjadi kesalahan saat memperbarui transaksi, kirim respons dengan status 500 dan pesan kesalahan
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getCheckoutByEmail,
  addItemToCheckout,
  getAllTransactions,
  DeleteTransaction,
  singleMenuItem,
  updateTransactionItem // This method should be exported
};
