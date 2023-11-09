const express = require("express");
const router = express.Router();
const bookController = require('../Controllers/bookController')


// books routes

router.get("/book/list", bookController.getBookList)
router.get("/book/:id", bookController.getBookById)
router.post("/book/new", bookController.createBook)
router.put("/book/:id", bookController.updateBook)
router.delete("/book/:id", bookController.deleteBook)
module.exports = router;