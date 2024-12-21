const {
    AddPurchase,
    GetAllPurchase ,
    GetSingleProducts,
    DeleteProducts,
    UpdateProducts
 } = require("../../../controllers/JusticePapperMill/StockControllers/PurchaseStocks")
 
const express = require("express")

const router = express.Router()

router.post('/jpurchase',AddPurchase)

router.get("/jpurchase", GetAllPurchase)

// router.get("/purchase/:id",GetSinglepurchase)

// router.put("/purchase/:id",Updatepurchase)


router.delete("/jpurchase/:id",DeleteProducts)





module.exports = router