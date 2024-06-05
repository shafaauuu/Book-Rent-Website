const Menu = require("../model/Menu");

const getAllMenuItems = async (req, res) => {
  try {
    const titles = await Menu.find({}).sort({ createdAt: -1 });
    res.status(200).json(titles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// post a new menu item
const postMenuItem = async (req, res) => {
  const newItem = req.body;
  try {
    const result = await Menu.create(newItem);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//
const deleteMenuItem = async (req, res) => {
  const menuId = req.params.id;
  try {
    const deletedItem = await Menu.findByIdAndDelete(menuId);
    if (!deletedItem) {
      return res.status(404).json({ message: "menu not found" });
    }
    res.status(200).json({ message: "book successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get single menu item
const singleMenuItem = async (req, res) => {
  const menuId = req.params.id;
  try {
    const menu = await Menu.findById(menuId);
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateMenuItem = async (req, res) => {
    const menuId = req.params.id;
    const { Title, author, category, price, rating, image } = req.body;
    try {
      const updatedMenu = await Menu.findByIdAndUpdate(
        menuId,
        { Title, author, category, price, rating, image },
        {
          new: true,
          runValidator: true,
        }
      );
      if(!updatedMenu) {
          return res.status(404).json({ message: "menu not found" });
      }
  
      res.status(200).json({ message: "book successfully deleted" });
  
    } catch (error) {
      res.status(500).json(updatedMenu);
    }
  };

module.exports = {
  getAllMenuItems,
  postMenuItem,
  deleteMenuItem,
  singleMenuItem,
  updateMenuItem
};
