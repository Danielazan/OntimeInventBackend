const {
    CreateCategory,
    GetAllcategory ,
    GetSingleCategory,
    UpdateCategory,
    DeleteCategory,
    UpdateCategoryBasedOnproduct

 } = require("../../../controllers/Pillar Pole/StockControllers/Category")
const express = require("express")

const router = express.Router()

router.post('/category', CreateCategory)

router.get("/category",  GetAllcategory)

router.get("/category/:id",GetSingleCategory)

router.put("/category/:id",UpdateCategory)

router.put("/categoryProducts/:CatName",UpdateCategoryBasedOnproduct)

router.delete("/category/:id",DeleteCategory)





module.exports = router