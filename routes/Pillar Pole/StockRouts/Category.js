const {
    CreateCategory,
    GetAllcategory ,
    GetSingleCategory,
    UpdateCategory,
    DeleteCategory

 } = require("../../../controllers/Pillar Pole/StockControllers/Category")
const express = require("express")

const router = express.Router()

router.post('/category', CreateCategory)

router.get("/category",  GetAllcategory)

router.get("/category/:id",GetSingleCategory)

router.put("/category/:id",UpdateCategory)

router.delete("/category/:id",DeleteCategory)





module.exports = router