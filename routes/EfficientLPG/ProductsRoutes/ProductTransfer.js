const {
    CreateTransfer,
    GetAllTransfers,
    GetSingleTransfer,
    UpdateTransfer,
    DeleteTransfer,
 } = require("../../../controllers/EfficientLPG/ProductsControllers/ProductTransfer")
const express = require("express")

const router = express.Router()

router.post('/eprotransfer',CreateTransfer)

router.get("/eprotransfer", GetAllTransfers)

router.get("/eprotransfer/:id",GetSingleTransfer)

router.put("/eprotransfer/:id",UpdateTransfer)


router.delete("/eprotransfer/:id",DeleteTransfer)





module.exports = router