const {
    GetAllOpenCloseBal,
    UpdateAllOpeningQuantities
 } = require("../../../controllers/Pillar Pole/StockControllers/StockOpenCloseBal")

const express = require("express")

const router = express.Router()

// router.post('/jNewSuppliers',CreateSupplier)

router.get("/PillarOpenClose",GetAllOpenCloseBal)


router.put("/PillarOpenClose",UpdateAllOpeningQuantities)


// router.delete("/jNewSuppliers/:id",DeleteSupplier)





module.exports = router