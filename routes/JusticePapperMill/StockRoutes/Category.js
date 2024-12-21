const {
    CreateCategory,
    GetAllcategory ,
    GetSingleCategory,
    UpdateCategory,
    DeleteCategory,
    UpdateCategoryBasedOnproduct

 } = require("../../../controllers/JusticePapperMill/StockControllers/Category")
const express = require("express")

const router = express.Router()

router.post('/jcategory', CreateCategory)

router.get("/jcategory",  GetAllcategory)

router.get("/jcategory/:id",GetSingleCategory)

router.put("/jcategory/:id",UpdateCategory)

router.put("/jcategoryProducts/:CatName",UpdateCategoryBasedOnproduct)

router.delete("/jcategory/:id",DeleteCategory)





module.exports = router