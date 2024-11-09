const {
    CreateTransfer,
    GetAllTransfers,
    GetSingleTransfer,
    UpdateTransfer,
    DeleteTransfer,
 } = require("../../../controllers/JusticePapperMill/StockControllers/StockTransfer")
const express = require("express")

const router = express.Router()

router.post('/jstocktransfer',CreateTransfer)

router.get("/jstocktransfer", GetAllTransfers)

router.get("/jstocktransfer/:id",GetSingleTransfer)

router.put("/jstocktransfer/:id",UpdateTransfer)


router.delete("/jstocktransfer/:id",DeleteTransfer)





module.exports = router