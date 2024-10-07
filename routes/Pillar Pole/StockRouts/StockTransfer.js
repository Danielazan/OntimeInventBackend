const {
    CreateTransfer,
    GetAllTransfers,
    GetSingleTransfer,
    UpdateTransfer,
    DeleteTransfer,
 } = require("../../../controllers/Pillar Pole/StockControllers/StockTransfer")
const express = require("express")

const router = express.Router()

router.post('/stocktransfer',CreateTransfer)

router.get("/stocktransfer", GetAllTransfers)

router.get("/stocktransfer/:id",GetSingleTransfer)

router.put("/stocktransfer/:id",UpdateTransfer)


router.delete("/stocktransfer/:id",DeleteTransfer)





module.exports = router