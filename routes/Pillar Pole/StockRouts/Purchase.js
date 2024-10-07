const {
    AddPurchase,
    GetAllPurchase ,
    GetSingleProducts,
    DeleteProducts,
    UpdateProducts
 } = require("../../../controllers/Pillar Pole/StockControllers/PurchaseProduct")
const express = require("express")

const router = express.Router()

router.post('/purchase',AddPurchase)

router.get("/purchase", GetAllPurchase)

// router.get("/purchase/:id",GetSinglepurchase)

// router.put("/purchase/:id",Updatepurchase)


// router.delete("/purchase/:id",DeleteProducts)





module.exports = router