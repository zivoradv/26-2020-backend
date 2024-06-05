const express = require("express")
const { createItem, getItems, getItem, deleteItem, updateItem, getItemsPerPage, uploadItem, countDoc, getAvgWeight, getArrivedItems, searchItems, getCarriers} = require("../Controllers/ItemController")
const router = express.Router()

//Create item
router.post("/items/" , createItem)

//Upload item
router.post("/upload/" , uploadItem)

//Search for an items
router.get("/search/" , searchItems)

//Get items per page
router.get("/items/page/:page" , getItemsPerPage)

//Get all items
router.get("/items/" , getItems)

//Get item
router.get("/items/:id" , getItem)

//Delete item
router.delete("/items/:id" , deleteItem)

//Update item
router.put("/edit/:id" , updateItem)

//Gets a number of documents in collection
router.get("/aggregate/countDoc", countDoc);

//Gets average item weight
router.get("/aggregate/averageWeight", getAvgWeight);

//Gets curriers
router.get("/aggregate/carriers", getCarriers);

//Gets arrived items
router.get("/aggregate/getArrivedItems", getArrivedItems);

module.exports = router